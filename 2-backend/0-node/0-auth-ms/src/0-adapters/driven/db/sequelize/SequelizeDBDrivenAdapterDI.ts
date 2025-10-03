import { ISubjectRepository } from "@domain/auth/ports/repositories/ISubjectRepository";
import { IoCContainer } from "@crosscutting/ioc/IoCContainer";
import { SubjectRepository } from "./repositories/SubjectRepository";
import { ICredentialRepository } from "@domain/auth/ports/repositories/ICredentialRepository";
import { CredentialRepository } from "./repositories/CredentialRepository";
import { ISessionRepository } from "@domain/auth/ports/repositories/ISessionRepository";
import { SessionRepository } from "./repositories/SessionRepository";

export class SequelizeDBDrivenAdapterDI {
    public static register(container: IoCContainer): void {

        container.register({ service: ISubjectRepository, useClass: SubjectRepository });
        container.register({ service: ICredentialRepository, useClass: CredentialRepository });
        container.register({ service: ISessionRepository, useClass: SessionRepository });
    }
}