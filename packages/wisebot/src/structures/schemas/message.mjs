import WisebotSchema from './schema';

export default class MessageSchema extends WisebotSchema {
	/**
	 * Creates a message payload
	 *
	 * @param {Object} options
	 *
	 * @return {Object}
	 */
	static createMessagePayload({ from, sender }) {
		return {
			from: MessageSchema.createTarget(from),
			sender: MessageSchema.createTarget(sender)
		};
	}

	static createTarget({ id, type }) {
		return {
			name: ''
		};
	}
}
