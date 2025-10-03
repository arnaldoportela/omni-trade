import argon2 from "argon2";

import { ISubjectRepository } from "@domain/auth/ports/repositories/ISubjectRepository";
import { Injectable } from "../../../3-crosscutting/ioc/InjectableDecorator";

import { RegisterInputDTO } from "../dtos/input/RegisterInputDto";

import { IRegisterUseCase } from "./ports/IRegisterUsecase";
import { SubjectEntity } from "@domain/auth/entities/SubjectEntity";
import { CredentialEntity } from "@domain/auth/entities/CredentialEntity";

@Injectable()
export class RegisterUseCase extends IRegisterUseCase {

    constructor(private readonly _subjectRepository: ISubjectRepository) {
        super();
    }

    async execute(data: RegisterInputDTO): Promise<any> {

        const passwordHash = await argon2.hash(data.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1 
        });

        const id = await this._subjectRepository.add(new SubjectEntity(
            null,
            data.name,
            [new CredentialEntity(null, null, data.email, passwordHash)]
        ));

        return { subjectId: id };
    }
}