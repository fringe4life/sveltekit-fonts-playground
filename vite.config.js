import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { enhancedFonts } from '@sveltejs/enhanced-fonts';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/** @typedef {'static' | 'cloudflare' | 'vercel' | 'netlify' | 'node' | 'bun'} AdapterFlavor */

/** @type {Record<AdapterFlavor, string>} */
const ADAPTER_PACKAGES = {
	static: '@sveltejs/adapter-static',
	cloudflare: '@sveltejs/adapter-cloudflare',
	vercel: '@sveltejs/adapter-vercel',
	netlify: '@sveltejs/adapter-netlify',
	node: '@sveltejs/adapter-node',
	bun: '@sveltejs/adapter-bun'
};

const adapter_name = /** @type {AdapterFlavor} */ (process.env.ADAPTER ?? 'static');
if (!(adapter_name in ADAPTER_PACKAGES)) {
	throw new Error(
		`Unknown ADAPTER=${JSON.stringify(process.env.ADAPTER)}. Use ${Object.keys(ADAPTER_PACKAGES).join('|')}`
	);
}

const is_dev = process.argv.includes('dev');
const env_base = process.env.BASE_PATH ?? '';
/** @type {'' | `/${string}`} */
const base = is_dev || env_base === '' ? '' : /** @type {`/${string}`} */ (env_base);

const require = createRequire(import.meta.url);
const barcode_woff2 = path.join(
	path.dirname(require.resolve('@fontsource/libre-barcode-128-text/package.json')),
	'files/libre-barcode-128-text-latin-400-normal.woff2'
);

/**
 * @returns {Promise<import('@sveltejs/kit').Adapter>}
 */
async function load_adapter() {
	const mod = await import(ADAPTER_PACKAGES[adapter_name]);
	const factory = mod.default;
	if (adapter_name === 'static') {
		return factory({ fallback: '404.html' });
	}
	return factory();
}

export default defineConfig(async () => {
	const adapter = await load_adapter();
	return {
		plugins: [
			sveltekit({
				adapter,
				paths: { base }
			}),
			// enhancedFonts must come after sveltekit() so compiled CSS is visible
			enhancedFonts({
				families: [
					{
						name: 'Inter',
						cssVariable: '--font-inter',
						provider: 'google',
						weights: ['400', '600'],
						styles: ['normal'],
						subsets: ['latin'],
						display: 'swap',
						preload: false
					},
					{
						name: 'Fraunces',
						cssVariable: '--font-home',
						provider: 'google',
						weights: ['400'],
						styles: ['normal'],
						subsets: ['latin'],
						display: 'swap',
						preload: false
					},
					{
						name: 'Lora',
						cssVariable: '--font-serif',
						provider: 'google',
						weights: ['400'],
						styles: ['normal'],
						subsets: ['latin'],
						display: 'swap',
						preload: false
					},
					{
						name: 'Libre Barcode 128 Text',
						cssVariable: '--font-display',
						provider: 'local',
						src: [{ path: barcode_woff2, weight: '400', style: 'normal' }],
						display: 'swap',
						preload: false
					}
				]
			})
		]
	};
});
