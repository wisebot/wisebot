import { WisebotService } from '@wisebot/wisebot';

import VKAdapter from './adapter';

import { VKMessageContext } from './structures/contexts';

import { defaultOptions, SERVICE_NAME } from './utils/constants';

export default class VKService extends WisebotService {
	/**
	 * Constructor
	 *
	 * @param {Object} [options={}]
	 */
	constructor(options = {}) {
		super();

		this.options = { ...defaultOptions };

		this.adapter = new VKAdapter(options.adapter);

		this.setOptions(options);

		const { updates } = this.adapter.client;

		updates.on('message', (raw) => {
			const context = new VKMessageContext({}, {
				service: this,
				raw
			});


		});
	}

	/**
	 * @implements
	 */
	getServiceName() {
		return SERVICE_NAME;
	}

	/**
	 * Start polling
	 *
	 * @return {Promise}
	 */
	async startPolling() {
		const { updates } = this.adapter.client;

		await updates.startPolling();
	}

	/**
	 * Stops all action
	 *
	 * @return {Promise}
	 */
	async stop() {
		const { updates } = this.adapter.client;

		await updates.stop();
	}
}
