import { IAuditableEntity } from "./IAuditableEntity";

export class SessionEntity extends IAuditableEntity{

    constructor(
        public id: string | null,
        public subjectId: string | null,
        public expiresAt: Date,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        super(id, createdAt, updatedAt);
    }
}