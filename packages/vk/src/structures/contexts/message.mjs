import { MessageContext } from '@wisebot/wisebot';

export default class VKMessageContext extends MessageContext {
	constructor({ payload }, { service, raw }) {
		super({ payload });

		this.service = service;
		this.raw = raw;
	}
}
