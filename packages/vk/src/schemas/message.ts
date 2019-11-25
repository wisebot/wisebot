import { MessageContext, messageSources } from 'vk-io';

import { IMessagePayloadSchema, MessageSenderType, ContextType } from '@wisebot/wisebot';

const transformPurposeType = (type: string): MessageSenderType => {
	if (type === messageSources.CHAT) {
		return MessageSenderType.CONVERSATION;
	}

	if (type === messageSources.GROUP) {
		return MessageSenderType.BOT;
	}

	return MessageSenderType.USER;
};

export default (
	context: MessageContext,
	{ serviceId }: { serviceId: string }
): IMessagePayloadSchema => ({
	type: ContextType.MESSAGE,
	subTypes: [],

	service: {
		id: serviceId,
		name: 'vk'
	},

	from: {
		id: context.peerId,
		type: transformPurposeType(context.peerType)
	},
	sender: {
		id: context.senderId,
		type: transformPurposeType(context.senderType)
	},

	object: {
		text: context.text || undefined
	}
});
