import VK from 'vk-io';
import { WisebotAdapter } from '@wisebot/wisebot';

export default class VKAdapter extends WisebotAdapter {
	constructor(options) {
		super(options);

		this.client = new VK();
	}
}
