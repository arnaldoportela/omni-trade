import argon2 from "argon2";
import { IAuditableEntity } from "./IAuditableEntity";

export class CredentialEntity extends IAuditableEntity{

    constructor(
        public id: string | null,
        public subjectId: string | null,
        public email: string,
        public passwordHash: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        super(id, createdAt, updatedAt);
    }

    public async validatePassword(plainPassword: string): Promise<boolean>{
        console.log("password: ", plainPassword)
        console.log("Entity: ", this)
        return await argon2.verify(this.passwordHash, plainPassword);
    }
}