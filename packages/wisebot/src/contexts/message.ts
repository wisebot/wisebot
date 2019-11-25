import { IWisebotService } from '../service';
import Context, { IContextOptions } from './context';
import { ContextType, ContextSubType, MessageSenderType } from '../constants';

export interface IMessageContextOptions<P, S> extends IContextOptions<P, S> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	raw: any;
}

export interface IMessageSender {
	id: string | number;
	type: MessageSenderType;
}

export interface IMessagePayloadSchema {
	type: ContextType.MESSAGE;

	service: {
		id: string;
		name: string;
	};

	subTypes: ContextSubType[];

	sender: IMessageSender;

	from: IMessageSender;

	to?: IMessageSender;

	object: {
		text?: string;
	};
}

export interface IMessageContextSendParams {
	text: string;

	disableNotification?: boolean;
	disableWebPagePreview?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class MessageContext<S = Record<string, any>>
	extends Context<IMessagePayloadSchema, S> {
	public readonly type = ContextType.MESSAGE;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public raw: any;

	public constructor({
		service,

		payload,
		state,
		raw
	}: IMessageContextOptions<IMessagePayloadSchema, S>) {
		super({
			service,

			state,
			payload
		});

		this.raw = raw;
	}

	/**
	 * Checks if the sender is a bot
	 */
	public get isUser(): boolean {
		return this.senderType === MessageSenderType.USER;
	}

	/**
	 * Checks if the sender is a bot
	 */
	public get isBot(): boolean {
		return this.senderType === MessageSenderType.BOT;
	}

	/**
	 * The identifier of the entity that sent the message
	 */
	public get senderId(): string | number {
		return this.payload.sender.id;
	}

	/**
	 * The type of entity that sent the message
	 */
	public get senderType(): MessageSenderType {
		return this.payload.sender.type;
	}

	/**
	 * The identifier of the entity where the message was sent from
	 */
	public get fromId(): string | number {
		return this.payload.from.id;
	}

	/**
	 * The entity type from where the message was sent
	 */
	public get fromType(): MessageSenderType {
		return this.payload.from.type;
	}

	/**
	 * The identifier of entity where the message will be sent
	 */
	public get toId(): string | number | undefined {
		if (!this.payload.to) {
			return undefined;
		}

		return this.payload.to.id;
	}

	/**
	 * The type of entity where the message will be sent
	 */
	public get toType(): MessageSenderType | undefined {
		if (!this.payload.to) {
			return undefined;
		}

		return this.payload.to.type;
	}

	/**
	 * Contains message text, may be undefined
	 */
	public get text(): string | undefined {
		return this.payload.object.text;
	}

	public set text(text: string | undefined) {
		this.payload.object.text = text;
	}

	/**
	 * Sends a message
	 */
	public send(
		text: string | IMessageContextSendParams,
		rawParams?: IMessageContextSendParams
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<any> {
		const params = (typeof text === 'string'
			? { text, ...rawParams }
			: { ...rawParams }) as IMessageContextSendParams;

		const purpose = { ...this.payload.from };

		const context = new MessageContext({
			payload: {
				type: this.payload.type,
				subTypes: this.payload.subTypes,

				service: this.payload.service,

				from: purpose,
				to: purpose,
				sender: { ...this.payload.sender },

				object: {
					text: params.text
				}
			},
			service: this.service,
			state: { ...this.state },
			raw: this.raw
		});

		return this.service.dispatchOutgoing(context);
	}
}
