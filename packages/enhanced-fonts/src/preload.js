/** Subsets that must be downloaded but never auto-preloaded (Next ignoredSubsets analog). */
const CJK_SUBSETS = new Set([
	'japanese',
	'korean',
	'chinese-simplified',
	'chinese-traditional',
	'chinese-hongkong',
	'chinese-japanese-korean'
]);

/**
 * Collapse duplicate hrefs (same hashed file, multiple weights) so `<Font>`
 * does not throw `each_key_duplicate` when keyed on `link.href`.
 *
 * @param {Array<{ href: string; type: string; subset?: string }>} preloads
 * @returns {Array<{ href: string; type: string; subset?: string }>}
 */
export function unique_by_href(preloads) {
	const seen = new Set();
	return preloads.filter((entry) => {
		if (seen.has(entry.href)) return false;
		seen.add(entry.href);
		return true;
	});
}

/**
 * @param {Array<{ href: string; type: string; subset?: string }>} preloads
 * @param {boolean} preload
 * @returns {Array<{ href: string; type: string; subset?: string }>}
 */
export function filter_preloads(preloads, preload) {
	if (!preload) return [];
	return unique_by_href(
		preloads.filter((entry) => !entry.subset || !CJK_SUBSETS.has(entry.subset))
	);
}

/**
 * @param {string | undefined} subset
 * @returns {boolean}
 */
export function is_cjk_subset(subset) {
	return !!subset && CJK_SUBSETS.has(subset);
}
