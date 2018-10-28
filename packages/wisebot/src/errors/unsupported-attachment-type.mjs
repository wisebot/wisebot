import WisebotError from './error';

export default class UnsupportedAttachmentTypeError extends WisebotError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ type }) {
		super({
			message: `Unsupported attachment type "${type}"`
		});
	}
}
