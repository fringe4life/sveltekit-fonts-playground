#!/usr/bin/env node
/**
 * Assert prerendered HTML matches the fonts playground matrix.
 * Run after `ADAPTER=static pnpm build` (or pass a directory).
 *
 * Checks `<style>` in `<head>` for `@font-face` / `:root { --font-*: ... }` so
 * page prose that mentions `--font-*` cannot make the assertion pass.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'build');

function read(rel) {
	const file = path.join(root, rel);
	if (!fs.existsSync(file)) {
		throw new Error(`Missing ${file}`);
	}
	return fs.readFileSync(file, 'utf8');
}

/**
 * @param {string} html
 */
function head(html) {
	const match = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
	return match ? match[1] : '';
}

/**
 * Concatenate `<style>` bodies from `<head>` (Font emits CSS there, not in page copy).
 * @param {string} html
 */
function headStyles(html) {
	return [...head(html).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
		.map((match) => match[1])
		.join('\n');
}

/**
 * @param {string} html
 */
function fontPreloads(html) {
	return [...head(html).matchAll(/<link\b[^>]*>/gi)]
		.map((match) => match[0])
		.filter((tag) => /rel="preload"/i.test(tag) && /as="font"/i.test(tag));
}

/**
 * @param {string} css
 * @param {string} cssVariable
 * @param {string} familyName
 */
function hasFontCss(css, cssVariable, familyName) {
	const escapedVar = cssVariable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const escapedName = familyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const rootDecl = new RegExp(`${escapedVar}\\s*:\\s*"${escapedName}"`);
	const face = new RegExp(`@font-face\\s*\\{[^}]*font-family:\\s*"${escapedName}"`, 's');
	return rootDecl.test(css) && face.test(css);
}

/**
 * @param {string} html
 * @param {string} slugFragment file slug, e.g. `inter`
 */
function hasFontPreload(html, slugFragment) {
	const needle = `/fonts/${slugFragment}-`;
	return fontPreloads(html).some((tag) => {
		const href = tag.match(/href="([^"]+)"/i);
		return href ? href[1].includes(needle) : false;
	});
}

const home = read('index.html');
const about = read('about.html');
const display = read('display.html');
const homeCss = headStyles(home);
const aboutCss = headStyles(about);
const displayCss = headStyles(display);

const checks = [
	['/ Inter CSS', hasFontCss(homeCss, '--font-inter', 'Inter')],
	['/ Inter preload', hasFontPreload(home, 'inter')],
	['/ Fraunces CSS', hasFontCss(homeCss, '--font-home', 'Fraunces')],
	['/ no Lora', !hasFontCss(homeCss, '--font-serif', 'Lora')],
	['/about Inter CSS', hasFontCss(aboutCss, '--font-inter', 'Inter')],
	['/about no font preload', fontPreloads(about).length === 0],
	['/about Lora CSS', hasFontCss(aboutCss, '--font-serif', 'Lora')],
	['/about no Fraunces', !hasFontCss(aboutCss, '--font-home', 'Fraunces')],
	['/display Inter CSS', hasFontCss(displayCss, '--font-inter', 'Inter')],
	['/display no font preload', fontPreloads(display).length === 0],
	['/display barcode CSS', hasFontCss(displayCss, '--font-display', 'Libre Barcode 128 Text')],
	['/display no Lora', !hasFontCss(displayCss, '--font-serif', 'Lora')]
];

let failed = 0;
for (const [label, ok] of checks) {
	if (!ok) {
		console.error(`FAIL ${label}`);
		failed++;
	} else {
		console.log(`ok   ${label}`);
	}
}

if (failed) {
	process.exit(1);
}
