import WisebotAttachment from './attachment';

import { attachmentTypes } from '../../utils/constants';

export default class AudioAttachment extends WisebotAttachment {
	/**
	 * Returns the attachment type
	 *
	 * @return {string}
	 */
	get type() {
		return attachmentTypes.AUDIO;
	}
}
