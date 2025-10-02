import { CredentialEntity } from "@domain/entities/CredentialEntity";
import { IRepository } from "./IRepository";

export abstract class ICredentialRepository extends IRepository<CredentialEntity>{

}