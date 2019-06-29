import { WisebotError } from './errors';

import { defaultOptions } from './utils/constants';

import { IncomingMiddleware, OutgoingMiddleware } from './structures/middlewares';

export default class Wisebot {
	/**
	 * Constructor
	 *
	 * @param {Object} [options={}]
	 */
	constructor(options = {}) {
		this.options = { ...defaultOptions };

		this.incoming = new IncomingMiddleware();
		this.outgoing = new OutgoingMiddleware();

		this.services = new Set();

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

	/**
	 * Added service
	 *
	 * @param {WisebotService} service
	 */
	addService(service) {
		if (this.services.has(service)) {
			throw new WisebotError({
				message: 'Duplicate service instance'
			});
		}

		this.services.add(service);

		service.subscribe({
			incoming: context => (
				this.incoming.send(context)
			),
			outgoing: async (context) => {
				const { finished } = await this.outgoing.send(context);

				if (!finished) {
					return null;
				}

				const response = await service.adapter.sendOutgoing(context);

				return response;
			}
		});
	}
}
