import { AbstractSubjectRepository } from "@domain/auth/ports/repositories/AbstractSubjectRepository";
import { IoCContainer } from "@crosscutting/ioc/IoCContainer";
import { SubjectRepository } from "./repositories/SubjectRepository";
import { AbstractCredentialRepository } from "@domain/auth/ports/repositories/AbstractCredentialRepository";
import { CredentialRepository } from "./repositories/CredentialRepository";
import { AbstractSessionRepository } from "@domain/auth/ports/repositories/AbstractSessionRepository";
import { SessionRepository } from "./repositories/SessionRepository";

export class SequelizeDBDrivenAdapterDI {
    public static register(container: IoCContainer): void {

        container.register({ service: AbstractSubjectRepository, useClass: SubjectRepository });
        container.register({ service: AbstractCredentialRepository, useClass: CredentialRepository });
        container.register({ service: AbstractSessionRepository, useClass: SessionRepository });
    }
}