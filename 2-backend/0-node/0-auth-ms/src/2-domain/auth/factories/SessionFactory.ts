import { AbstractHasher } from "@crosscutting/crypto/AbstractHasher";
import { SessionEntity } from "../entities/SessionEntity";
import { HashVO } from "../value-objects/HashVO";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

@Injectable()
export class SessionFactory {
    private readonly hasher: AbstractHasher;

    constructor(_hasher: AbstractHasher) {
        this.hasher = _hasher;
    }

    public async create(
        _id: string | undefined,
        _subjectId: string | undefined,
        _fingerprint: string,
        _idleExpiresDate: Date,
        _maxExpiresDate: Date,
        _createdAt: Date = new Date(),
        _updatedAt: Date = new Date()
    ): Promise<SessionEntity> {
        return SessionEntity.create(
            _id,
            _subjectId,
            await HashVO.create(_fingerprint, this.hasher),
            _idleExpiresDate,
            _maxExpiresDate,
            _createdAt,
            _updatedAt
        )
    }
}