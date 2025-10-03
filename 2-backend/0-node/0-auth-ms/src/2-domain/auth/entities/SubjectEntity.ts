import { CredentialEntity } from "./CredentialEntity";
import { IAuditableEntity } from "./IAuditableEntity";
import { SessionEntity } from "./SessionEntity";

export class SubjectEntity extends IAuditableEntity {

    public id: string | undefined;
    public name: string;
    public credentials: CredentialEntity[];
    public sessions: SessionEntity[];
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        _id: string | undefined,
        _name: string,
        _credentials: CredentialEntity[] = [],
        _sessions: SessionEntity[] = [],
        _createdAt: Date = new Date(),
        _updatedAt: Date = new Date()
    ) {
        super(_id, _createdAt, _updatedAt);

        this.id = _id;
        this.name = _name;
        this.credentials = _credentials;
        this.sessions = _sessions;
        this.createdAt = _createdAt;
        this.updatedAt = _updatedAt;
    }
}