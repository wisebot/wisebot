import Repository from './repository';

import { I18nContext } from './structures/contexts';

import LocaleLoader from './utils/locale-loader';
import { defaultOptions } from './utils/constants';

export default class I18n {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		this.options = {
			...defaultOptions,
			...options
		};

		this.repository = new Repository();
		this.localeLoader = new LocaleLoader();
	}

	/**
	 * Load locales
	 *
	 * @param {string} path
	 *
	 * @return {Promise}
	 */
	async loadLocales(path) {
		const locales = await this.localeLoader.readDir(path);

		for (const locale of locales) {
			this.repository.addLocale(locale.filename, locale.data);
		}
	}

	/**
	 * Returns the middleware
	 *
	 * @param {Object} options
	 * @param {string} options.key
	 *
	 * @return {Function}
	 */
	getMiddleware({ key = 'i18n' } = {}) {
		return (context, next) => {
			context[key] = new I18nContext({
				repository: this.repository,
				options: this.options
			});

			return next();
		};
	}
}
