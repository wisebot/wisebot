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

		return this;
	}

	/**
	 * Returns the adapter
	 *
	 * @return {WisebotAdapter}
	 */
	getAdapter() {
		return this.adapter;
	}

	/**
	 * Returns the service id
	 *
	 * @return {string}
	 */
	getServiceId() {
		return this.options.serviceId;
	}

	/**
	 * Returns the service name
	 *
	 * @return {string}
	 */
	getServiceName() {
		throw new Error('Override the method with service name');
	}

	/**
	 * Performs actions to start
	 *
	 * @return {Promise}
	 */
	async connect() {
		if (!this.options.serviceId) {
			generateServiceWarning(this.getServiceName(), 'Set the service identifier in the serviceId option, because by default it will be random');

			this.options.serviceId = generateServiceId();
		}
	}
}
