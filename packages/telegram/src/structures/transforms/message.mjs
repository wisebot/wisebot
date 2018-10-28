import {
	contextTypes,
	contextActions
} from '@wisebot/wisebot';

import transformAttachment from './attachment';
import { SERVICE_NAME } from '../../utils/constants';

export default (context, { serviceId }) => {
	const { from, chat, message } = context;

	return {
		action: contextActions.CREATE,

		type: contextTypes.MESSAGE,
		subTypes: [],

		service: {
			id: serviceId,
			name: SERVICE_NAME
		},

		from: {
			id: chat.id,
			type: chat.type
		},
		sender: {
			id: from.id,
			type: 'user'
		},

		object: {
			text: message.text || null,
			attachments: transformAttachment(message)
		}
	};
};
