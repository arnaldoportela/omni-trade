import { AbstractEntity } from "./AbstractEntity";

export abstract class AbstractAuditableEntity extends AbstractEntity{

    constructor(
        public id: string | undefined,
        public createdAt: Date,
        public updatedAt: Date
    ) {
        super(id);
    }
}