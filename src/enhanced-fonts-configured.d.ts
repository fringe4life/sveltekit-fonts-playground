/** Fallback until Vite writes `.svelte-kit/experimental-enhanced-fonts.d.ts`. */
declare module '@sveltejs/enhanced-fonts' {
	interface ConfiguredFontCssVariables {
		'--font-inter': true;
		'--font-home': true;
		'--font-serif': true;
		'--font-display': true;
	}
}

export {};
