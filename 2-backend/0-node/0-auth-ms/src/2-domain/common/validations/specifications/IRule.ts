import { ValidationError } from "../../ValidationError";

export abstract class IRule<T> {
    public field: keyof T;
    public abstract validate(value: T[keyof T]): ValidationError | null;     
}