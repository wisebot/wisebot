import { WisebotService } from '@wisebot/wisebot';

import TelegramAdapter from './adapter';

import { TelegramMessageContext } from './structures/contexts';
import { transformMessage } from './structures/transforms';

import { defaultOptions, SERVICE_NAME } from './utils/constants';

export default class TelegramService extends WisebotService {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options = {}) {
		super();

		this.options = { ...defaultOptions };

		this.adapter = new TelegramAdapter(options.adapter);

		this.setOptions(options);

		const { client } = this.adapter;

		client.on('message', async (raw) => {
			const payload = await transformMessage(raw, {
				serviceId: this.serviceId
			});

			const context = new TelegramMessageContext({
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
		const { client } = this.adapter;

		client.startPolling();
	}

	/**
	 * Stops all action
	 *
	 * @return {Promise}
	 */
	async stop() {
		const { client } = this.adapter;

		client.stop();
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

		if (outgoing && typeof outgoing !== 'function') {
			throw new TypeError('outgoing should be function');
		}

		this.onOutcoming = outgoing;
	}
}
