import Middleware from 'middleware-io/lib';

import WisebotError from '../../errors';

export default class IncomingMiddleware {
	/**
	 * Constructor
	 */
	constructor() {
		this.stack = [];

		this.chain = new Middleware();
	}

	/**
	 * Added middleware
	 *
	 * @param {Object} ware
	 *
	 * @return {this}
	 */
	use(ware) {
		const hasName = this.stack.some(middleware => middleware.name === ware.name);

		if (hasName) {
			throw new WisebotError({
				message: 'Another middleware with the same name has already been registered'
			});
		}

		this.stack.push(ware);

		this.reload();

		return this;
	}

	/**
	 * Sends an context
	 *
	 * @param {Context} context
	 *
	 * @return {Promise}
	 */
	send(context) {
		return this.chain.run(context);
	}

	/**
	 * Reloads middleware
	 */
	reload() {
		const middlewares = this.stack
			.filter(middleware => middleware.enabled)
			.map(middleware => middleware.handler);

		this.chain = new Middleware(middlewares);
	}
}
