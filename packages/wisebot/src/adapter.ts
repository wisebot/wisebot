import { Context } from './contexts';

export interface IWisebotAdapter {
	/**
	 * The client the adapter interacts with
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	client: Record<string, any>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sendOutgoing(context: Context): Promise<any>;
}

export default class WisebotAdapter {

}
