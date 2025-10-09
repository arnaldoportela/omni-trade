import { CredentialEntity } from "@domain/auth/entities/CredentialEntity";
import { AbstractRepository } from "./AbstractRepository";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class AbstractCredentialRepository extends AbstractRepository<CredentialEntity>{
    public abstract selectByEmail(email: string): Promise<CredentialEntity | null>;
}