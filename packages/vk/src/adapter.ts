import { VK } from 'vk-io';

import {
	WisebotAdapter,

	Context,
	MessageContext,

	ContextType,

	IWisebotAdapter
} from '@wisebot/wisebot';

export interface IVKAdapterOptions {
	token: string;
}

export default class VKAdapter extends WisebotAdapter implements IWisebotAdapter {
	public client = new VK();

	/**
	 * Constructor
	 */
	public constructor(options: IVKAdapterOptions) {
		super();

		this.client.setOptions({
			token: options.token,

			apiLimit: 20
		});
	}

	/**
	 * Sends outgoing context
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public sendOutgoing(rawContext: Context): Promise<any> {
		if (rawContext.type !== ContextType.MESSAGE) {
			return Promise.reject(new Error('Context type not supported'));
		}

		const context = rawContext as MessageContext;

		return this.client.api.messages.send({
			// eslint-disable-next-line @typescript-eslint/camelcase
			peer_id: context.toId as number,

			message: context.text
		});
	}
}
