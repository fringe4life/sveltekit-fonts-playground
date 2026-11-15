import assert from 'node:assert/strict';
import { test } from 'node:test';
import { font_base_from_vite_config, font_public_base, join_font_url } from './resolve.js';

const file = '_app/immutable/fonts/inter-400-normal.abc123.woff2';

test('root-relative Vite base', () => {
	assert.equal(join_font_url('/', file), `/${file}`);
	assert.equal(join_font_url('', file), `/${file}`);
});

test('path-based Vite base (GitHub Pages)', () => {
	assert.equal(
		join_font_url('/sveltekit-fonts-playground/', file),
		`/sveltekit-fonts-playground/${file}`
	);
	assert.equal(
		join_font_url('/sveltekit-fonts-playground', file),
		`/sveltekit-fonts-playground/${file}`
	);
});

test('absolute CDN Vite base keeps the scheme slashes', () => {
	assert.equal(join_font_url('https://cdn.example.com/', file), `https://cdn.example.com/${file}`);
	assert.equal(
		join_font_url('https://cdn.example.com/app', file),
		`https://cdn.example.com/app/${file}`
	);
});

test('relative Vite base becomes kit paths.base so nested routes do not resolve against the document directory', () => {
	assert.equal(font_public_base('./', ''), '');
	assert.equal(font_public_base('.', '/sveltekit-fonts-playground'), '/sveltekit-fonts-playground');
	assert.equal(join_font_url(font_public_base('./', ''), file), `/${file}`);
	assert.equal(
		join_font_url(font_public_base('./', '/app'), file),
		`/app/${file}`
	);
});

test('font_base_from_vite_config reads Kit paths.base from define', () => {
	assert.equal(
		font_base_from_vite_config({
			base: './',
			define: { __SVELTEKIT_PATHS_BASE__: JSON.stringify('/sveltekit-fonts-playground') }
		}),
		'/sveltekit-fonts-playground'
	);
});
