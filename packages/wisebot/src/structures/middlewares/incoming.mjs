import Middleware from 'middleware-io';

import { WisebotError } from '../../errors';
import { middlewarePriority } from '../../utils/constants';

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
	use({
		name,
		description = null,

		enabled = true,
		priority = middlewarePriority.DEFAULT,

		handler
	}) {
		const hasName = this.stack.some(middleware => middleware.name === name);

		if (hasName) {
			throw new WisebotError({
				message: 'Another middleware with the same name has already been registered'
			});
		}

		this.stack.push({
			name,
			description,

			enabled,
			priority,

			handler
		});

		if (enabled) {
			this.reload();
		}

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
