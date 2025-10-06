export abstract class AbstractValidator<T>{
    protected abstract rules: AbstractRuleBase<T>[];

    validate(object: T): ValidationError[] {
        const errors: ValidationError[] = [];
        for (const rule of this.rules) {
            const error = rule.validate(object[rule.field]);
            if (error) {
                errors.push(error);
            }
        }
        return errors;
    }
}