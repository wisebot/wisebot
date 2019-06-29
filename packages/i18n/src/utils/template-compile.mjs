import nodeVM from 'vm';

const { Script } = nodeVM;

const TEMPLATE_RE = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/;

const TEMPLATE_QUOTE_RE = /`/gm;

const EMPTY_HASH = Object.freeze(Object.create(null));

export default (template, { timeout = 5e2 } = {}) => {
	if (typeof template !== 'string') {
		throw new TypeError('The template must be a string');
	}

	// OPTIMIZE: If you don't need to change anything, just return the string
	if (!TEMPLATE_RE.test(template)) {
		return () => template;
	}

	const vm = new Script(`\`${template.replace(TEMPLATE_QUOTE_RE, '\\`')}\``);

	const vmOptions = { timeout };

	return (context = EMPTY_HASH) => {
		try {
			return vm.runInNewContext(context, vmOptions);
		} catch (error) {
			throw new Error('Failed to compile template', error);
		}
	};
};
