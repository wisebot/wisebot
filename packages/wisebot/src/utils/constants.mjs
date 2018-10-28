export const symbols = {
	INSTALL: Symbol('Install ')
};

export const defaultOptions = {

};

export const middlewarePriority = {
	BEFORE: -Infinity,
	AFTER: Infinity,

	BEFORE_BOOTSTRAP: -20,
	BOOTSTRAP: 15,
	AFTER_BOOTSTRAP: 10,

	BEFORE_DEFAULT: 5,
	DEFAULT: 10,
	AFTER_DEFAULT: 15,

	BEFORE_COMMAND: 20,
	COMMAND: 25,
	AFTER_COMMAND: 30,

	BEFORE_HEAR: 35,
	HEAR: 40,
	AFTER_HEAR: 45,

	BEFORE_PLATFORM: 195,
	PLATFORM: 200,
	AFTER_PLATFORM: 205
};

export const contextTypes = {
	MESSAGE: 'message'
};

export const contextSubTypes = {

};

export const attachmentTypes = {
	IMAGE: 'image',
	VIDEO: 'video',
	AUDIO: 'audio',
	DOCUMENT: 'document'
};

export const contextActions = {
	CREATE: 'create',
	UPDATE: 'update'
};

/**
 * Inspect custom data
 *
 * @type {Symbol}
 */
export const inspectCustomData = Symbol('inspectCustomData');
