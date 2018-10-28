import WisebotContext from './context';

import { contextTypes, inspectCustomData } from '../../utils/constants';

export default class MessageContext extends WisebotContext {
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
