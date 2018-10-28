import {
	contextTypes,
	contextActions
} from '@wisebot/wisebot';

import transformAttachment from './attachment';
import { SERVICE_NAME } from '../../utils/constants';

export default (context, { serviceId }) => {
	const { $sender, $from } = context;

	return {
		action: contextActions.CREATE,

		type: contextTypes.MESSAGE,
		subTypes: [],

		service: {
			id: serviceId,
			name: SERVICE_NAME
		},

		from: {
			id: $from.id,
			type: $from.type
		},
		sender: {
			id: $sender.id,
			type: $sender.type
		},

		object: {
			text: context.text || null,
			attachments: context.attachments.map(transformAttachment)
		}
	};
};
