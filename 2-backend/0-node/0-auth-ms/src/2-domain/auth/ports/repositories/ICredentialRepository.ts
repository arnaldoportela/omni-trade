import { CredentialEntity } from "@domain/auth/entities/CredentialEntity";
import { IRepository } from "./IRepository";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class ICredentialRepository extends IRepository<CredentialEntity>{
    public abstract selectByEmail(email: string): Promise<CredentialEntity | null>;
}