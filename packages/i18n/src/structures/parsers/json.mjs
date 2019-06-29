import I18nParser from './parser';

export default class JSONParser extends I18nParser {
	get fileExtensions() {
		return ['.json'];
	}

	async parse(content) {
		return JSON.parse(content);
	}
}
