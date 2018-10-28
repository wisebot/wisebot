import nodeUtil from 'util';

import { inspectCustomData } from '../../utils/constants';

const { inspect } = nodeUtil;

export default class WisebotAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ payload = {}, raw }) {
		this.payload = payload;

		this.raw = raw;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Returns the attachment type
	 *
	 * @return {string}
	 */
	get type() {
		return this.payload.type;
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		const { payload } = this;

		return { payload };
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		const customData = {
			...this[inspectCustomData](),

			type: this.type
		};

		const payload = inspect(customData, {
			...options,

			compact: false
		});

		return `${options.stylize(name, 'special')} ${payload}`;
	}
}
