import { IPosition } from "monaco-editor";
import { MessageSystemType } from "../message-system";
import {
    MessageSystemServiceAction,
    MessageSystemServiceActionConfig,
} from "./message-system.service-action";

export interface MonacoAdapterActionCallbackConfig {
    /**
     * Retrieve the Monaco Model value
     */
    getMonacoModelValue: () => string[];

    /**
     * Update the Monaco Model value
     */
    updateMonacoModelValue: (value: string[], isExternal: boolean) => void;

    /**
     * Update the Monaco editors position
     */
    updateMonacoModelPosition: (dictionaryId?: string) => IPosition;

    /**
     * The message system type to run on
     */
    messageSystemType?: MessageSystemType;
}

export interface MonacoAdapterActionOptions {
    /**
     * The message system type to run on
     */
    messageSystemType?: MessageSystemType;
}

/**
 * Actions for the monaco adapter
 */
export class MonacoAdapterAction extends MessageSystemServiceAction<
    MonacoAdapterActionCallbackConfig,
    MessageSystemType,
    MonacoAdapterActionOptions
> {
    private getMonacoModelValue: () => string[];
    private updateMonacoModelValue: (value: string[], isExternal: boolean) => void;
    private updateMonacoModelPosition: (dictionaryId?: string) => IPosition;
    private messageSystemType: MessageSystemType;

    constructor(
        config: MessageSystemServiceActionConfig<
            MonacoAdapterActionCallbackConfig,
            MonacoAdapterActionOptions
        >
    ) {
        super(config);

        this.messageSystemType = config.messageSystemType;
    }

    /**
     * Invokes the action
     */
    public invoke = (): void => {
        this.getAction({
            getMonacoModelValue: this.getMonacoModelValue,
            updateMonacoModelValue: this.updateMonacoModelValue,
            updateMonacoModelPosition: this.updateMonacoModelPosition,
            messageSystemType: this.messageSystemType,
        })();
    };

    /**
     * Retrieve callbacks from parent adapter
     */
    public addConfig(config: MonacoAdapterActionCallbackConfig): void {
        this.getMonacoModelValue = config.getMonacoModelValue;
        this.updateMonacoModelValue = config.updateMonacoModelValue;
        this.updateMonacoModelPosition = config.updateMonacoModelPosition;
        this.messageSystemType = config.messageSystemType;
    }

    /**
     * Retrieve the message system type for this action
     */
    public getMessageSystemType(): MessageSystemType {
        return this.messageSystemType;
    }

    matches = (type: MessageSystemType): boolean => {
        return this.messageSystemType === type;
    };
}
