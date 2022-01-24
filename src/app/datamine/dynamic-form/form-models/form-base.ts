import { ValidatorFn } from '@angular/forms';

export class FormBase<T> {
    public value: T;
    public key: string;
    public label: string;
    public required: boolean;
    public disabled: boolean;
    public validators: Record<string, ValidatorFn[]>;
    public order: number;
    public controlType: string;
    public type: string;
    public options: { key: string; value: string }[];

    public constructor(
        optionsInput: {
            value?: T;
            key?: string;
            label?: string;
            required?: boolean;
            disabled?: boolean;
            validators?: Record<string, ValidatorFn[]>;
            order?: number;
            controlType?: string;
            type?: string;
            options?: { key: string; value: string }[];
        } = {}) {
        this.value = optionsInput.value;
        this.key = optionsInput.key || '';
        this.label = optionsInput.label || '';
        this.required = !!optionsInput.required;
        this.disabled = optionsInput.disabled;
        this.validators = optionsInput.validators;
        this.order = optionsInput.order === undefined ? 1 : optionsInput.order;
        this.controlType = optionsInput.controlType || '';
        this.type = optionsInput.type || '';
        this.options = optionsInput.options || [];
    }
}
