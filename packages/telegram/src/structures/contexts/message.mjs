import {
	MessageContext,

	contextTypes,
	contextActions
} from '@wisebot/wisebot';

export default class TelegramMessageContext extends MessageContext {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({
		service,
		payload,
		state,
		raw
	}) {
		super({ payload, state });

		this.raw = raw;
		this.service = service;
	}

	/**
	 * Sends a message
	 *
	 * @param {Object} options
	 *
	 * @return {Promise}
	 */
	send(options) {
		const { payload } = this;

		const context = new TelegramMessageContext(
			{
				service: this.service,
				state: this.state,
				raw: this.raw,

				payload: {
					action: contextActions.CREATE,

					type: contextTypes.MESSAGE,
					subTypes: [],

					service: payload.service,

					to: payload.from,

					object: {
						text: options.text,
						attachments: []
					}
				}
			}
		);

		return this.service.dispatchOutgoing(context);
	}

	sendText(text) {
		return this.send({ text });
	}
}
