import { WisebotAttachment } from '@wisebot/wisebot';

const ATTACHMENT_PROPERTIES = [
	'document',
	'audio',
	'photo',
	'video',
	'voice',
];

const enumTypes = {
	photo: 'image'
};

export default message => (
	ATTACHMENT_PROPERTIES
		.map(property => (
			property in message
				? {
					type: enumTypes[property] || property,
					raw: message[property]
				}
				: undefined
		))
		.filter(Boolean)
		.map(({ raw, payload }) => (
			new WisebotAttachment({ raw, payload })
		))
);
