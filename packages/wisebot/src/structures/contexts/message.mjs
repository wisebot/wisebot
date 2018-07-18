import WisebotContext from './context';

import { contextTypes } from '../../utils/constants';

export default class MessageContext extends WisebotContext {
	/**
	 * @implements
	 */
	get type() {
		return contextTypes.MESSAGE;
	}

	/**
	 * Returns the service
	 *
	 * @return {WisebotService}
	 */
	getService() {
		return this.service;
	}

	/**
	 * Returns the sender
	 *
	 * @return {Object}
	 */
	getSender() {
		return this.payload.sender;
	}

	/**
	 * Returns the from message
	 *
	 * @return {Object}
	 */
	getFrom() {
		return this.payload.from;
	}

	/**
	 * Returns the to message
	 *
	 * @return {?Object}
	 */
	getTo() {
		return this.payload.to;
	}

	/**
	 * Returns the raw
	 *
	 * @return {?Object}
	 */
	getRaw() {
		return this.raw;
	}
}
