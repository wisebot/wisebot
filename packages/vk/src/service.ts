import {
	WisebotService,

	MessageContext,
	Context,

	IWisebotService
} from '@wisebot/wisebot';

import VKAdapter, { IVKAdapterOptions } from './adapter';

import transformMessageToPayload from './schemas/message';

export interface IVKServiceOptions {
	id: string;

	adapter: IVKAdapterOptions;
}

export default class VKService extends WisebotService implements IWisebotService {
	public id: string;

	public name = 'vk';

	public adapter: VKAdapter;

	private listeners: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		incoming: (context: Context) => any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		outgoing: (context: Context) => any;
	} = {
		incoming: (): never => {
			throw new Error('No one has subscribed to incoming events');
		},
		outgoing: (): never => {
			throw new Error('No one has subscribed to outgoing events');
		}
	};

	/**
	 * Constructor
	 */
	public constructor(options: IVKServiceOptions) {
		super();

		this.id = options.id;

		this.adapter = new VKAdapter(options.adapter);

		this.adapter.client.updates.on('message', (raw): void => {
			if (raw.isOutbox || raw.isEvent) {
				return;
			}

			const payload = transformMessageToPayload(raw, {
				serviceId: this.id
			});

			const context = new MessageContext({
				service: this,
				state: {},
				payload,
				raw
			});

			this.listeners.incoming(context);
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public dispatchOutgoing(context: Context): Promise<any> {
		return this.listeners.outgoing(context);
	}

	/**
	 * Starts receiving events through Polling
	 */
	public startPolling(): Promise<void> {
		return this.adapter.client.updates.start();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public subscribe({ incoming, outgoing }: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		incoming: (context: Context) => any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		outgoing: (context: Context) => any;
	}): void {
		this.listeners.incoming = incoming;
		this.listeners.outgoing = outgoing;
	}
}
