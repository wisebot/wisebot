import WisebotAttachment from './attachment';

import { attachmentTypes } from '../../utils/constants';

export default class DocumentAttachment extends WisebotAttachment {
	/**
	 * Returns the attachment type
	 *
	 * @return {string}
	 */
	get type() {
		return attachmentTypes.DOCUMENT;
	}
}
