import { Injectable } from "../../../3-crosscutting/ioc/InjectableDecorator";

import { LoginInputDTO } from "../dtos/input/LoginInputDto";

import { AbstractLoginUseCase } from "./ports/AbstractLoginUsecase";
import { LoginOutputDTO } from "../dtos/output/LoginOutputDto";
import { AbstractCredentialRepository } from "@domain/auth/ports/repositories/AbstractCredentialRepository";
import { AbstractSessionRepository } from "@domain/auth/ports/repositories/AbstractSessionRepository";
import { SessionEntity } from "@domain/auth/entities/SessionEntity";
import { SessionFactory } from "@domain/auth/factories/SessionFactory";

@Injectable()
export class LoginUseCase extends AbstractLoginUseCase {

    private readonly credentialRepository: AbstractCredentialRepository;
    private readonly sessionRepository: AbstractSessionRepository;
    private readonly sessionFactory: SessionFactory;

    constructor(
        _credentialRepository: AbstractCredentialRepository,
        _sessionRepository: AbstractSessionRepository,
        _sessionFactory: SessionFactory
    ) {
        super();
        this.credentialRepository = _credentialRepository;
        this.sessionRepository = _sessionRepository;
        this.sessionFactory = _sessionFactory;
    }

    async execute(data: LoginInputDTO): Promise<LoginOutputDTO> {

        const credential = await this.credentialRepository.selectByEmail(data.email);

        //TODO: Standarize errors
        if (!(credential && await credential?.validatePassword(data.password))) {
            throw Error("Invalid Credentials");
        }

        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 30);

        const entity = await this.sessionFactory.create(
            undefined,
            credential.subjectId,
            data.userAgent ?? 'Test',
            expirationDate,
            expirationDate);
        
        const sessionId = await this.sessionRepository.add(entity);

        return { sessionId: sessionId } as LoginOutputDTO;
    }
}