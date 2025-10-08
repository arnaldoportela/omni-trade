import { Injectable } from "../../../3-crosscutting/ioc/InjectableDecorator";

import { LoginInputDTO } from "../dtos/input/LoginInputDto";

import { AbstractLoginUseCase } from "./ports/AbstractLoginUsecase";
import { LoginOutputDTO } from "../dtos/output/LoginOutputDto";
import { ICredentialRepository } from "@domain/auth/ports/repositories/ICredentialRepository";
import { ISessionRepository } from "@domain/auth/ports/repositories/ISessionRepository";
import { SessionEntity } from "@domain/auth/entities/SessionEntity";

@Injectable()
export class LoginUseCase extends AbstractLoginUseCase {

    private readonly credentialRepository: ICredentialRepository;
    private readonly sessionRepository: ISessionRepository;

    constructor(
        _credentialRepository: ICredentialRepository,
        _sessionRepository: ISessionRepository
    ) {
        super();
        this.credentialRepository = _credentialRepository;
        this.sessionRepository = _sessionRepository;
    }

    async execute(data: LoginInputDTO): Promise<LoginOutputDTO> {

        const credential = await this.credentialRepository.selectByEmail(data.email);

        //TODO: Standarize errors
        if (!(credential && await credential?.validatePassword(data.password))) {
            throw Error("Invalid Credentials");
        }

        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 30);

        const sessionId = await this.sessionRepository.add(new SessionEntity(
            undefined,
            credential.subjectId,
            data.fingerprint ?? 'Test',
            expirationDate,
            expirationDate));

        return { sessionId: sessionId } as LoginOutputDTO;
    }
}