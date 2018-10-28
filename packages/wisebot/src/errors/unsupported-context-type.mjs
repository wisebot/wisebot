import WisebotError from './error';

export default class UnsupportedContextTypeError extends WisebotError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ type }) {
		super({
			message: `Unsupported context type "${type}"`
		});
	}
}
