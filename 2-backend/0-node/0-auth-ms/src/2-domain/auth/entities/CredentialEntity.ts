import { IAuditableEntity } from "./IAuditableEntity";

export class CredentialEntity extends IAuditableEntity{

    constructor(
        public id: string,
        public subjectId: string,
        public email: string,
        public passwordHadh: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        super(id, createdAt, updatedAt);
    }
}