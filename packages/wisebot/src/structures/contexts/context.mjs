/**
 * General context class
 *
 * @public
 */
export default class WisebotContext {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ payload = {}, state = {} }) {
		this.payload = payload;

		this.state = state;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Returns the context type
	 *
	 * @return {string}
	 */
	get type() {
		return this.payload.type;
	}

	/**
	 * Returns the context sub types
	 *
	 * @return {string[]}
	 */
	get subTypes() {
		return this.payload.subTypes;
	}

	/**
	 * Checks whether the context of some of these types
	 *
	 * @param {string[]} types
	 *
	 * @return {boolean}
	 */
	is(types) {
		if (Array.isArray(types)) {
			// eslint-disable-next-line no-param-reassign
			types = [types];
		}

		return [this.type, this.subTypes].some(typeName => (
			types.includes(typeName)
		));
	}
}
