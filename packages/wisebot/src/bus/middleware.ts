import { Middleware, compose, noopNext } from 'middleware-io';

export interface IMiddlewareBusUseOptions<T> {
	/**
	 * The middleware slug
	 */
	slug: string;

	/**
	 * The middleware description
	 */
	description?: string;

	/**
	 * Is middleware enabled
	 */
	enabled?: boolean;

	/**
	 * Priority middleware to the ratio of others
	 */
	priority?: number;

	/**
	 * Middleware handler
	 */
	handler: Middleware<T>;
}

export type MiddlewareBusOptions<T> =
	Required<Omit<IMiddlewareBusUseOptions<T>, 'description'>>
	& {
		description?: string;
	};

export default class MiddlewareBus<T = {}> {
	protected stack: MiddlewareBusOptions<T>[] = [];

	protected chain: Middleware<T> = compose([]);

	/**
	 * Adds middleware to the chain
	 */
	public use<NewT = {}>({
		slug,

		description,

		enabled = true,

		priority = 0,

		handler
	}: IMiddlewareBusUseOptions<T & NewT>): MiddlewareBus<T & NewT> {
		const hasSlug = this.stack.some((options): boolean => (
			options.slug === slug
		));

		if (hasSlug) {
			throw new Error(`Another middleware with the same slug "${slug}" has already been registered`);
		}

		this.stack.push({
			slug,

			description,

			enabled,

			priority,

			// @ts-ignore
			handler
		});

		if (enabled) {
			this.recomposeChain();
		}

		return this;
	}

	/**
	 * Sends context to middleware chain
	 */
	public send(context: T): Promise<void> {
		return this.chain(context, noopNext);
	}

	/**
	 * Recomposes the middleware chain
	 * excluding those that are disabled and sorts by priority
	 */
	protected recomposeChain(): void {
		const middlewares = this.stack
			.filter((options): boolean => options.enabled)
			.sort((a, b): number => a.priority - b.priority)
			.map((options): Middleware<T> => options.handler);

		this.chain = compose(middlewares);
	}
}
