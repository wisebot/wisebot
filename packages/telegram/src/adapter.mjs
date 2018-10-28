import Telegraf from 'telegraf';
import {
	WisebotAdapter,
	UnsupportedContextTypeError,

	contextTypes
} from '@wisebot/wisebot';

export default class TelegramAdapter extends WisebotAdapter {
	constructor() {
		super();

		this.client = new Telegraf();
	}

	/**
	 * Sets options
	 *
	 * @param {Object} options
	 *
	 * @return {this}
	 */
	setOptions(options) {
		super.setOptions(options);

		if (options.token) {
			this.client.token = options.token;
		}

		if (options.agent) {
			this.client.telegram.options.agent = options.agent;
		}

		return this;
	}

	async sendOutgoing(context) {
		if (context.type !== contextTypes.MESSAGE) {
			throw new UnsupportedContextTypeError({
				type: context.type
			});
		}

		const params = {
			chat_id: context.to.id,
			text: context.text
		};

		await this.client.telegram.callApi('sendMessage', params);
	}
}
