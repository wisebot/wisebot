import { IWisebotAdapter } from './adapter';

import { Context } from './contexts';

export interface IWisebotService {
	/**
	 * Unique service identifier
	 */
	id: string;

	/**
	 * Service name
	 */
	name: string;

	/**
	 * Adapter for interacting with the service
	 */
	adapter: IWisebotAdapter;

	/**
	 * Sends a context to the outgoing listener
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dispatchOutgoing(context: Context): any;

	/**
	 * Subscribes to service events
	 */
	subscribe(listeners: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		incoming: (context: Context) => any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		outgoing: (context: Context) => any;
	}): void;
}

export default class WisebotService {

}
