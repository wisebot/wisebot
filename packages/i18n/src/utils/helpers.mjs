/**
 * Returns the splitted path
 *
 * @param {string} path
 *
 * @return {string[]}
 */
export const splitPath = path => path.split('.');

/**
 * Returns the value of object path
 *
 * @param {Object}   link
 * @param {string[]} parts
 *
 * @return {*}
 */
export const getPathValue = (link, parts) => {
	for (const part of parts) {
		if (typeof link !== 'object') {
			return undefined;
		}

		link = link[part];
	}

	return link;
};

/**
 * Merge two locales
 *
 * @param {Object} source
 * @param {Object} target
 */
export const mergeLocales = (source, target) => {
	for (const [key, value] of Object.entries(target)) {
		if (typeof value !== 'object') {
			source[key] = value;

			continue;
		}

		if (typeof source[key] !== 'object') {
			source[key] = {};
		}

		mergeLocales(source[key], value);
	}
};

/**
 * Returns the flatten object
 *
 * @param {Object} source
 *
 * @return {Object}
 */
export const getFlattenObject = (source) => {
	const destination = {};

	for (const [key, value] of Object.entries(source)) {
		if (typeof value !== 'object') {
			destination[key] = value;

			continue;
		}

		const flatten = getFlattenObject(value);

		for (const [nestedKey, nestedValue] of Object.entries(flatten)) {
			destination[`${key}.${nestedKey}`] = nestedValue;
		}
	}

	return destination;
};

/**
 * Returns the language short code
 *
 * @param {string} language
 *
 * @return {?sring}
 */
export const getShortCode = (language) => {
	const index = language.indexOf('_');

	if (index === -1) {
		return null;
	}

	return language.substring(0, index);
};
