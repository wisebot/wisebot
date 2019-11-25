import { MiddlewareBus, IMiddlewareBusUseOptions } from './bus';

import { Context } from './contexts';
import { IWisebotService } from './service';

type WisebotMiddlewareOptions<T> = IMiddlewareBusUseOptions<T> & {
	kind: 'incoming' | 'outgoing';
};

export default class Wisebot<T = {}> {
	/**
	 * Incoming middleware bus
	 */
	public incoming = new MiddlewareBus<Context & T>();

	/**
	 * Outgoing middleware bus
	 */
	public outgoing = new MiddlewareBus<Context & T>();

	/**
	 * Wisebot services
	 */
	private services = new Set();

	public constructor() {
		this.outgoing.use({
			slug: 'wisebot-outgoing',
			description: 'Sends messages from outgoing middleware',
			enabled: true,
			priority: 5000,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			handler(context): Promise<any> {
				return context.service.adapter.sendOutgoing(context);
			}
		});
	}

	public addService(service: IWisebotService): this {
		service.subscribe({
			incoming: async (context): Promise<void> => {
				try {
					// @ts-ignore
					await this.incoming.send(context);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.log('Incoming error', error);
				}
			},
			outgoing: async (context): Promise<void> => {
				try {
					// @ts-ignore
					await this.outgoing.send(context);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.log('Outgoing error', error);
				}
			}
		});

		this.services.add(service);

		return this;
	}

	/**
	 * Adds new middleware to the chain
	 */
	public use<NewT = {}>(options: WisebotMiddlewareOptions<Context & T & NewT>): Wisebot<NewT & T> {
		const { kind, ...middlewareOptions } = options;

		if (kind === 'incoming') {
			// @ts-ignore
			this.incoming.use(middlewareOptions);
		} else if (kind === 'outgoing') {
			// @ts-ignore
			this.outgoing.use(middlewareOptions);
		} else {
			throw new TypeError('Unknown kind of middleware chain');
		}

		return this;
	}
}
