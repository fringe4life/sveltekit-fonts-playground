/** @import { FontFamily } from '../types/index.js' */

const CSS_VARIABLE = /^--font-[A-Za-z_][\w-]*$/;

/**
 * @param {string} css_variable
 * @returns {boolean}
 */
export function is_font_css_variable(css_variable) {
	return CSS_VARIABLE.test(css_variable);
}

/**
 * @param {unknown} families
 * @returns {FontFamily[]}
 */
export function validate_families(families) {
	if (!Array.isArray(families)) {
		throw new Error('enhancedFonts({ families }) must be an array');
	}

	/** @type {FontFamily[]} */
	const validated = [];
	/** @type {Set<string>} */
	const seen_css_variables = new Set();

	for (const [index, family] of families.entries()) {
		if (!family || typeof family !== 'object') {
			throw new Error(`families[${index}] must be an object`);
		}

		const { name, cssVariable, provider, src } = /** @type {FontFamily} */ (family);

		if (typeof name !== 'string' || name.length === 0) {
			throw new Error(`families[${index}].name must be a non-empty string`);
		}

		if (typeof cssVariable !== 'string' || !is_font_css_variable(cssVariable)) {
			throw new Error(
				`families[${index}].cssVariable must be a --font-* custom property (received ${JSON.stringify(cssVariable)})`
			);
		}

		if (provider !== 'google' && provider !== 'local') {
			throw new Error(`families[${index}].provider must be "google" or "local"`);
		}

		if (provider === 'local' && (!Array.isArray(src) || src.length === 0)) {
			throw new Error(`families[${index}] local provider requires src`);
		}

		if (seen_css_variables.has(cssVariable)) {
			throw new Error(
				`Duplicate Font for ${cssVariable}: configure each --font-* once in enhancedFonts({ families })`
			);
		}
		seen_css_variables.add(cssVariable);

		validated.push(/** @type {FontFamily} */ (family));
	}

	return validated;
}
