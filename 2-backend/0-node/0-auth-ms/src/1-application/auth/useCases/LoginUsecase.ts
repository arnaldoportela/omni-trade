import { Injectable } from "../../../3-crosscutting/ioc/InjectableDecorator";

import { LoginInputDTO } from "../dtos/input/LoginInputDto";

import { ILoginUseCase } from "./ports/ILoginUsecase";
import { LoginOutputDTO } from "../dtos/output/LoginOutputDto";
import { ICredentialRepository } from "@domain/auth/ports/repositories/ICredentialRepository";
import { ISessionRepository } from "@domain/auth/ports/repositories/ISessionRepository";
import { SessionEntity } from "@domain/auth/entities/SessionEntity";

@Injectable()
export class LoginUseCase extends ILoginUseCase {

    constructor(
        private readonly _credentialRepository: ICredentialRepository,
        private readonly _sessionRepository: ISessionRepository
    ) {
        super();
    }

    async execute(data: LoginInputDTO): Promise<LoginOutputDTO> {

        const credential = await this._credentialRepository.selectByEmail(data.email);

        if (!(credential && await credential?.validatePassword(data.password))) {
            throw Error("Invalid Credentials");
        }

        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 30);

        const sessionId = await this._sessionRepository.add(new SessionEntity(null, credential.subjectId, expirationDate));

        return { sessionId: credential?.subjectId } as LoginOutputDTO;
    }
}