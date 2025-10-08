
import { AbstractAuditableEntity } from "./abstractions/AbstractAuditableEntity";
import { HashVO } from "../value-objects/HashVO";

export class SessionEntity extends AbstractAuditableEntity {

    public id: string | undefined;
    public subjectId: string | undefined;
    public fingerprint: HashVO;
    public idleExpiresDate: Date;
    public maxExpiresDate: Date;
    public createdAt: Date;
    public updatedAt: Date;

    private constructor(
        _id: string | undefined,
        _subjectId: string | undefined,
        _fingerprint: HashVO,
        _idleExpiresDate: Date,
        _maxExpiresDate: Date,
        _createdAt: Date,
        _updatedAt: Date
    ) {
        super(_id, _createdAt, _updatedAt);

        this.id = _id;
        this.subjectId = _subjectId;
        this.fingerprint = _fingerprint;
        this.idleExpiresDate = _idleExpiresDate;
        this.maxExpiresDate = _maxExpiresDate;
        this.createdAt = _createdAt;
        this.updatedAt = _updatedAt;
    }

    public static create(
        _id: string | undefined,
        _subjectId: string | undefined,
        _fingerprint: HashVO,
        _idleExpiresDate: Date,
        _maxExpiresDate: Date,
        _createdAt: Date = new Date(),
        _updatedAt: Date = new Date()
    ) {
        // TODO: Validate
        return new SessionEntity(
            _id,
            _subjectId,
            _fingerprint,
            _idleExpiresDate,
            _maxExpiresDate,
            _createdAt,
            _updatedAt
        );
    }
}