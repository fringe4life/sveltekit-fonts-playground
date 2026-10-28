#!/usr/bin/env node
/**
 * Assert prerendered HTML matches the fonts playground matrix.
 * Run after `ADAPTER=static pnpm build` (or pass a directory).
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

function preloads(html) {
	return [...html.matchAll(/<link[^>]+rel="preload"[^>]*>/gi)].filter((m) =>
		/as="font"/.test(m[0])
	);
}

function hasVar(html, name) {
	return html.includes(name);
}

const home = read('index.html');
const about = read('about.html');
const display = read('display.html');

const checks = [
	['/ Inter CSS', hasVar(home, '--font-inter')],
	['/ Inter preload', preloads(home).length >= 1],
	['/ Fraunces CSS', hasVar(home, '--font-home')],
	['/ no Lora', !hasVar(home, '--font-serif')],
	['/about Inter CSS', hasVar(about, '--font-inter')],
	['/about no font preload', preloads(about).length === 0],
	['/about Lora CSS', hasVar(about, '--font-serif')],
	['/about no Fraunces', !hasVar(about, '--font-home')],
	['/display Inter CSS', hasVar(display, '--font-inter')],
	['/display no font preload', preloads(display).length === 0],
	['/display barcode CSS', hasVar(display, '--font-display')],
	['/display no Lora', !hasVar(display, '--font-serif')]
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
