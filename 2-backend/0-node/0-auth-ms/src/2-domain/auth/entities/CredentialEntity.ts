import argon2 from "argon2";
import { IAuditableEntity } from "./IAuditableEntity";

export class CredentialEntity extends IAuditableEntity {

    public id: string | undefined;
    public subjectId: string | undefined;
    public email: string;
    public passwordHash: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        _id: string | undefined,
        _subjectId: string | undefined,
        _email: string,
        _passwordHash: string,
        _createdAt: Date = new Date(),
        _updatedAt: Date = new Date()
    ) {
        super(_id, _createdAt, _updatedAt);

        this.id = _id;
        this.subjectId = _subjectId;
        this.email = _email;
        this.passwordHash = _passwordHash;
        this.createdAt = _createdAt;
        this.updatedAt = _updatedAt;
    }

    public async validatePassword(plainPassword: string): Promise<boolean> {
        return await argon2.verify(this.passwordHash, plainPassword);
    }
}