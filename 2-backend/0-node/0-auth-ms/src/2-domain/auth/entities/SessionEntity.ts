import { IAuditableEntity } from "./IAuditableEntity";

export class SessionEntity extends IAuditableEntity {

    public id: string | undefined;
    public subjectId: string | undefined;
    public expiresAt: Date;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        _id: string | undefined,
        _subjectId: string | undefined,
        _expiresAt: Date,
        _createdAt: Date = new Date(),
        _updatedAt: Date = new Date()
    ) {
        super(_id, _createdAt, _updatedAt);

        this.id = _id;
        this.subjectId = _subjectId;
        this.expiresAt = _expiresAt;
        this.createdAt = _createdAt;
        this.updatedAt = _updatedAt;
    }
}