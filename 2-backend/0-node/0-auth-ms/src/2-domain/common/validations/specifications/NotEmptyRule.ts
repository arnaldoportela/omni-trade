import { IRule } from "./IRule";
import { ValidationError } from "../ValidationError";

export abstract class NotEmptyRule<T> extends IRule<T> { 
    constructor(
        public readonly field: keyof T,
        private readonly message: string = `${String(field)} should not be empty`
    ) {
        super();
    }

    public validate(value: T[keyof T]): ValidationError | null {
        if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
            return new ValidationError(this.field as string, this.message);
        }
        return null;
    }
}