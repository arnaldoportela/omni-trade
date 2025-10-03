import { IEntity } from "./IEntity";

export class IAuditableEntity extends IEntity{

    constructor(
        public id: string | null,
        public createdAt: Date,
        public updatedAt: Date
    ) {
        super(id);
    }
}