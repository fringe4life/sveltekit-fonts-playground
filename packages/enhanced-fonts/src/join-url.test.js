import assert from 'node:assert/strict';
import { test } from 'node:test';
import { join_font_url } from './resolve.js';

test('root-relative Vite base', () => {
	assert.equal(
		join_font_url('/', '_app/immutable/fonts/inter-400-normal.abc123.woff2'),
		'/_app/immutable/fonts/inter-400-normal.abc123.woff2'
	);
	assert.equal(
		join_font_url('', '_app/immutable/fonts/inter-400-normal.abc123.woff2'),
		'/_app/immutable/fonts/inter-400-normal.abc123.woff2'
	);
});

test('path-based Vite base (GitHub Pages)', () => {
	assert.equal(
		join_font_url(
			'/sveltekit-fonts-playground/',
			'_app/immutable/fonts/inter-400-normal.abc123.woff2'
		),
		'/sveltekit-fonts-playground/_app/immutable/fonts/inter-400-normal.abc123.woff2'
	);
	assert.equal(
		join_font_url(
			'/sveltekit-fonts-playground',
			'_app/immutable/fonts/inter-400-normal.abc123.woff2'
		),
		'/sveltekit-fonts-playground/_app/immutable/fonts/inter-400-normal.abc123.woff2'
	);
});

test('absolute CDN Vite base keeps the scheme slashes', () => {
	assert.equal(
		join_font_url(
			'https://cdn.example.com/',
			'_app/immutable/fonts/inter-400-normal.abc123.woff2'
		),
		'https://cdn.example.com/_app/immutable/fonts/inter-400-normal.abc123.woff2'
	);
	assert.equal(
		join_font_url(
			'https://cdn.example.com/app',
			'_app/immutable/fonts/inter-400-normal.abc123.woff2'
		),
		'https://cdn.example.com/app/_app/immutable/fonts/inter-400-normal.abc123.woff2'
	);
});
