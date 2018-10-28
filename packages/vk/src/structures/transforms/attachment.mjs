import { attachmentTypes } from 'vk-io';
import {
	WisebotAttachment,

	ImageAttachment,
	VideoAttachment,
	AudioAttachment,
	DocumentAttachment,

	attachmentTypes as wisebotAttachmentTypes
} from '@wisebot/wisebot';

const enumTypes = {
	[attachmentTypes.PHOTO]: wisebotAttachmentTypes.IMAGE,
	[attachmentTypes.DOCUMENT]: wisebotAttachmentTypes.DOCUMENT,
};

const enumAttachments = {
	[attachmentTypes.PHOTO]: ImageAttachment,
	[attachmentTypes.VIDEO]: VideoAttachment,
	[attachmentTypes.AUDIO]: AudioAttachment,
	[attachmentTypes.DOCUMENT]: DocumentAttachment
};

const payloadAttachments = {
	[attachmentTypes.PHOTO]: photo => ({
		url: photo.largePhoto
	})
};

const noop = () => ({});

export default (raw) => {
	const transformPayload = payloadAttachments[raw.type] || noop;

	const payload = {
		type: enumTypes[raw.type] || raw.type,
		...transformPayload(raw)
	};

	const Attachment = enumAttachments[raw.type] || WisebotAttachment;

	return new Attachment({
		raw,
		payload
	});
};
