import { WisebotError } from '@wisebot/wisebot';

const kLocale = Symbol('locale');

export default class I18nContext {
	/**
	 * Constructor
	 *
	 * @param {Object}     options
	 * @param {Object}     options.options
	 * @param {Repository} options.repository
	 */
	constructor({ options, repository }) {
		this.options = options;
		this.repository = repository;

		this[kLocale] = options.locale;
	}

	/**
	 * Sets locale
	 *
	 * @param {string} languageCode
	 */
	set locale(languageCode) {
		if (!this.repository.hasLocale(languageCode)) {
			throw new WisebotError({
				message: `Locale "${languageCode}" not found`
			});
		}

		this[kLocale] = languageCode;
	}

	/**
	 * Returns the locale
	 *
	 * @return {string}
	 */
	get locale() {
		return this[kLocale];
	}

	/**
	 * [t description]
	 *
	 * @param {string} path
	 * @param {Object} params
	 *
	 * @return {string}
	 */
	t(path, params) {
		const { repository } = this;

		const template = repository.get(this.locale, path) || repository.get(
			this.options.fallbackLocale,
			path
		);

		if (template === null) {
			throw new WisebotError({
				message: 'Locale message not found'
			});
		}

		return template(params);
	}

	/**
	 * [pluralize description]
	 *
	 * @param {string} path
	 * @param {Object} params
	 *
	 * @return {string}
	 */
	pluralize(path, params) {
		/* TODO: Make it */
		return this.t(path, params);
	}
}
