import { WisebotService } from '@wisebot/wisebot';
import { defaultOptions, SERVICE_NAME } from './utils/constants';

export default class DiscordService extends WisebotService {
	/**
	 * Constructor
	 *
	 * @param {Object} [options={}]
	 */
	constructor(options = {}) {
		super();

		this.options = { ...defaultOptions };

		this.setOptions(options);
	}

	/**
	 * @implements
	 */
	get serviceName() {
		return SERVICE_NAME;
	}
}
