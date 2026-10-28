import type { Plugin } from 'vite';
import './ambient.js';

/** Augmented by `.svelte-kit/experimental-enhanced-fonts.d.ts` after `enhancedFonts()`. */
export interface ConfiguredFontCssVariables {}

type ConfiguredCssVariable = Extract<keyof ConfiguredFontCssVariables, `--font-${string}`>;

/** Configured `--font-*` names, or any `--font-*` before generation. */
export type CssVariable = [ConfiguredCssVariable] extends [never]
	? `--font-${string}`
	: ConfiguredCssVariable;

export type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

export interface LocalFontSrc {
	path: string;
	weight?: string;
	style?: 'normal' | 'italic';
	subset?: string;
}

export interface FontFamily {
	name: string;
	cssVariable: CssVariable;
	provider: 'google' | 'local';
	src?: LocalFontSrc[];
	weights?: string[];
	styles?: Array<'normal' | 'italic'>;
	subsets?: string[];
	display?: FontDisplay;
	preload?: boolean;
}

export interface EnhancedFontsOptions {
	families: FontFamily[];
	throwOnError?: boolean;
}

export type FontDataEntry = {
	src: Array<{ url: string; format: string }>;
	weight: string;
	style: string;
	subset?: string;
};

export function enhancedFonts(options?: EnhancedFontsOptions): Plugin;
export function getFontFileURL(href: string, base: string | URL): URL;
