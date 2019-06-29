import { WisebotError } from '@wisebot/wisebot';

import {
	// splitPath,
	// getPathValue,
	mergeLocales,
	getFlattenObject
} from './utils/helpers';

import templateCompile from './utils/template-compile';

export default class Repository {
	/**
	 * Constructor
	 */
	constructor() {
		this.locales = new Map();
		this.flattenTemplates = new Map();
	}

	/**
	 * Checks has locale
	 *
	 * @param {string} languageCode
	 *
	 * @return {boolean}
	 */
	hasLocale(languageCode) {
		return this.locales.has(languageCode);
	}

	/**
	 * Adds locale or extend locale
	 *
	 * @param {string} languageCode
	 * @param {Object} data
	 */
	addLocale(languageCode, data) {
		if (languageCode.toLowerCase() !== languageCode) {
			throw new WisebotError({
				message: 'Language code must be in lower case'
			});
		}

		if (typeof data !== 'object') {
			throw new WisebotError({
				message: 'Locale data must be an object'
			});
		}

		const locale = this.locales.get(languageCode) || {};

		mergeLocales(locale, data);

		this.locales.set(languageCode, locale);

		const flattenLocale = getFlattenObject(locale);

		const flattenTemplates = {};

		for (const [key, value] of Object.entries(flattenLocale)) {
			flattenTemplates[key] = templateCompile(value);
		}

		this.flattenTemplates.set(languageCode, new Map(
			Object.entries(flattenTemplates)
		));
	}

	/**
	 * Deletes locale
	 *
	 * @param {string} languageCode
	 *
	 * @param {boolean}
	 */
	deleteLocale(languageCode) {
		this.flattenLocale.delete(languageCode);

		return this.locales.delete(languageCode);
	}

	/**
	 * Checks has locale message
	 *
	 * @param {string} languageCode
	 * @param {string} path
	 *
	 * @return {boolean}
	 */
	has(languageCode, path) {
		if (this.hasLocale(languageCode)) {
			return false;
		}

		const flattenLocale = this.flattenTemplates.get(languageCode);

		return flattenLocale.has(path);
	}

	/**
	 * Returns the template string
	 *
	 * @param {string} languageCode
	 * @param {string} path
	 *
	 * @return {?string}
	 */
	get(languageCode, path) {
		const flattenLocale = this.flattenTemplates.get(languageCode);

		if (!flattenLocale) {
			throw new WisebotError({
				message: `Locale "${languageCode}" not found`
			});
		}

		return flattenLocale.get(path) || null;
	}
}
