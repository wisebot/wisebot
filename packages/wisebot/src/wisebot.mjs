import { defaultOptions } from './utils/constants';

import { IncomingMiddleware, OutcomingMiddleware } from './structures/middlewares';

export default class Wisebot {
	/**
	 * Constructor
	 *
	 * @param {Object} [options={}]
	 */
	constructor(options = {}) {
		this.options = { ...defaultOptions };

		this.incoming = new IncomingMiddleware();
		this.outcoming = new OutcomingMiddleware();

		this.setOptions(options);
	}

	/**
	 * Sets options
	 *
	 * @param {Object} options
	 *
	 * @return {this}
	 */
	setOptions(options) {
		Object.assign(this.options, options);

		return this;
	}
}
