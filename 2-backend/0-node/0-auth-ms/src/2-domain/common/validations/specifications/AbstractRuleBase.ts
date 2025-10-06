import type { ValidationError } from "../../ValidationError";

export abstract class AbstractRuleBase<T> {
    public field: keyof T;
    public abstract validate(value: T[keyof T]): ValidationError | null;     
}