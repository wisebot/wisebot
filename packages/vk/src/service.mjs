import { WisebotService } from '@wisebot/wisebot';

import VKAdapter from './adapter';

import { VKMessageContext } from './structures/contexts';
import { transformMessage } from './structures/transforms';

import { defaultOptions, SERVICE_NAME } from './utils/constants';

export default class VKService extends WisebotService {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options = {}) {
		super();

		this.options = { ...defaultOptions };

		this.adapter = new VKAdapter(options.adapter);

		this.setOptions(options);

		const { updates } = this.adapter.client;

		updates.on('message', async (raw) => {
			if (raw.isOutbox) {
				return;
			}

			const payload = await transformMessage(raw, {
				serviceId: this.serviceId
			});

			const context = new VKMessageContext({
				service: this,
				payload,
				raw
			});

			this.dispatchIncoming(context);
		});

		this.onIncoming = () => {};
		this.onOutcoming = context => this.sendOutgoing(context);
	}

	/**
	 * @implements
	 */
	get serviceName() {
		return SERVICE_NAME;
	}

	/**
	 * Start polling
	 *
	 * @return {Promise}
	 */
	async startPolling() {
		try {
			const [group] = await this.adapter.client.api.groups.getById();

			if (group) {
				this.adapter.setOptions({
					pollingGroupId: group.id
				});
			}
		// eslint-disable-next-line no-empty
		} catch (e) {}

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

	/**
	 * Runs the middleware chain incoming
	 *
	 * @param {Context} context
	 *
	 * @return {Promise}
	 */
	dispatchIncoming(context) {
		return this.onIncoming(context);
	}

	/**
	 * Runs the middleware chain outgoing
	 *
	 * @param {Context} context
	 *
	 * @return {Promise}
	 */
	dispatchOutgoing(context) {
		return this.onOutcoming(context);
	}

	/**
	 * Subscribe to events
	 *
	 * @param {Object} incoming
	 */
	subscribe({ incoming, outgoing }) {
		if (typeof incoming !== 'function') {
			throw new TypeError('incoming should be function;');
		}

		this.onIncoming = incoming;

		if (typeof outgoing !== 'function') {
			throw new TypeError('outgoing should be function');
		}

		this.onOutcoming = outgoing;
	}
}
