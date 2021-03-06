import VK from 'vk-io';
import {
	WisebotAdapter,
	UnsupportedContextTypeError,

	contextTypes
} from '@wisebot/wisebot';

export default class VKAdapter extends WisebotAdapter {
	constructor(options) {
		super(options);

		this.client = new VK();
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

		return this;
	}

	async sendOutgoing(context) {
		if (context.type !== contextTypes.MESSAGE) {
			throw new UnsupportedContextTypeError({
				type: context.type
			});
		}

		const params = {
			peer_id: context.to.id,
			message: context.text
		};

		await this.client.api.messages.send(params);
	}
}
