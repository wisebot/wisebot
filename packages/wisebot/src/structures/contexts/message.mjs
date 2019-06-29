import WisebotContext from './context';

import {
	contextTypes,
	contextActions,
	inspectCustomData
} from '../../utils/constants';

export default class MessageContext extends WisebotContext {
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
	 * @implements
	 */
	get type() {
		return contextTypes.MESSAGE;
	}

	/**
	 * Returns the sender
	 *
	 * @return {?Object}
	 */
	get sender() {
		return this.payload.sender || null;
	}

	/**
	 * Returns the from message
	 *
	 * @return {?Object}
	 */
	get from() {
		return this.payload.from || null;
	}

	/**
	 * Returns the to message
	 *
	 * @return {?Object}
	 */
	get to() {
		return this.payload.to || null;
	}

	/**
	 * Returns the message text
	 *
	 * @return {?string}
	 */
	get text() {
		return this.payload.object.text || null;
	}

	/**
	 * Sets the maessage text
	 *
	 * @param {string} text
	 */
	set text(text) {
		this.payload.object.text = text;
	}

	/**
	 * Returns the attachment
	 *
	 * @return {Attachment[]}
	 */
	get attachments() {
		return this.payload.object.attachments;
	}

	/**
	 * Generates a schema for sending
	 *
	 * @return {Promise<Object>}
	 */
	async toSchema() {
		throw new Error('Not implemented');
	}

	/**
	 * Sends a message
	 *
	 * @param {Object} options
	 *
	 * @return {Promise<Object>}
	 */
	send(options) {
		const { payload } = this;

		let attachments;
		if (options.attachments) {
			attachments = !Array.isArray(options.attachments)
				? [options.attachments]
				: options.attachments;
		} else {
			attachments = [];
		}

		const context = new MessageContext(
			{
				service: this.service,
				state: this.state,
				raw: this.raw,

				payload: {
					action: contextActions.CREATE,

					type: contextTypes.MESSAGE,
					subTypes: [],

					service: payload.service,

					from: payload.from,
					to: payload.from,

					object: {
						text: options.text,
						attachments
					}
				}
			}
		);

		return this.service.dispatchOutgoing(context);
	}

	/**
	 * Sends a text
	 *
	 * @param {string} text
	 * @param {Object} [options={}]
	 *
	 * @return {Promise<Object>}
	 */
	sendText(text, options = {}) {
		return this.send({
			text,

			...options
		});
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return {
			sender: this.sender,
			from: this.from,
			to: this.to,
			text: this.text,
			attachments: this.attachments
		};
	}
}
