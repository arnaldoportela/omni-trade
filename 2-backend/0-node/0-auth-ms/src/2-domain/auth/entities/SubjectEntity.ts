import { CredentialEntity } from "./CredentialEntity";
import { IAuditableEntity } from "./IAuditableEntity";
import { SessionEntity } from "./SessionEntity";

export class SubjectEntity extends IAuditableEntity{

    constructor(
        public id: string,
        public name: string,
        public credentials: CredentialEntity[] = [],
        public sessions: SessionEntity[] = [],
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        super(id, createdAt, updatedAt);
    }
}