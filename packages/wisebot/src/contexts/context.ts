import { IWisebotService } from '../service';
import { ContextType, ContextSubType } from '../constants';

export interface IContextPayload {
	subTypes: ContextSubType[];
}

export interface IContextOptions<P, S> {
	service: IWisebotService;

	state: S;

	payload: P;
}

export default class Context<P = {}, S = {}> {
	/**
	 * Indicates the main type of context
	 */
	public readonly type!: ContextType;

	/**
	 * Recommended space for storing context state
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public state: Record<string, any> & S;

	/**
	 * Wisebot Service
	 */
	public readonly service: IWisebotService;

	/**
	 * The payload from which the universal context works
	 */
	protected payload: IContextPayload & P;

	/**
	 * Constructor
	 */
	public constructor({
		service,

		state,

		payload
	}: IContextOptions<IContextPayload & P, S>) {
		this.service = service;

		this.state = state;

		this.payload = payload;
	}

	/**
	 * Returns custom tag
	 */
	protected get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Subtypes based on payload content
	 */
	public get subTypes(): ContextSubType[] {
		return this.payload.subTypes;
	}

	/**
	 * Checks whether the context of some of these types
	 */
	public is(types: (ContextType | ContextSubType | string)[]): boolean {
		return [this.type, ...this.subTypes].some((typeName): boolean => (
			types.includes(typeName)
		));
	}

	/**
	 * Allow setting unknown properties
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[property: string]: any;
}
