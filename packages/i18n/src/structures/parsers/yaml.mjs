import YAML from 'yaml';

import I18nParser from './parser';

export default class YAMLParser extends I18nParser {
	get fileExtensions() {
		return ['.yml', '.yaml'];
	}

	async parse(content) {
		return YAML.parse(content);
	}
}
