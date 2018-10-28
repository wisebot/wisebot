import { generateServiceId, generateServiceWarning } from './utils/helpers';

export default class WisebotService {
	/**
	 * Returns options
	 *
	 * @return {Object}
	 */
	getOptions() {
		return this.options;
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

		if (options.adapter) {
			this.adapter.setOptions(options.adapter);
		}

		return this;
	}

	/**
	 * Returns the service id
	 *
	 * @return {string}
	 */
	get serviceId() {
		if (!this.options.serviceId) {
			generateServiceWarning(this.serviceName, 'Set the service identifier in the serviceId option, because by default it will be random');

			this.options.serviceId = generateServiceId();
		}

		return this.options.serviceId;
	}

	/**
	 * Returns the service name
	 *
	 * @return {string}
	 */
	get serviceName() {
		throw new Error('Override the method with service name');
	}

	/**
	 * Runs the middleware chain outgoing
	 *
	 * @return {Promise}
	 */
	async dispatchOutgoing() {
		throw new Error('Method is not implemented');
	}

	/**
	 * Send outgoing context
	 *
	 * @param {Context} context
	 *
	 * @return {Promise}
	 */
	async sendOutgoing() {
		throw new Error('Method is not implemented');
	}
}
