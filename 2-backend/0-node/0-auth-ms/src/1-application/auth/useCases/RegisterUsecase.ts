import argon2 from "argon2";

import { ISubjectRepository } from "@domain/auth/ports/repositories/ISubjectRepository";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { RegisterInputDTO } from "../dtos/input/RegisterInputDto";

import { AbstractRegisterUseCase } from "./ports/AbstractRegisterUsecase";
import { SubjectEntity } from "@domain/auth/entities/SubjectEntity";
import { CredentialEntity } from "@domain/auth/entities/CredentialEntity";

@Injectable()
export class RegisterUseCase extends AbstractRegisterUseCase {

    private readonly subjectRepository: ISubjectRepository;

    constructor(_subjectRepository: ISubjectRepository) {
        super();

        this.subjectRepository = _subjectRepository;
    }

    async execute(data: RegisterInputDTO): Promise<any> {

        const passwordHash = await argon2.hash(data.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1 
        });

        const id = await this.subjectRepository.add(new SubjectEntity(
            undefined,
            data.name,
            [new CredentialEntity(undefined, undefined, data.email, passwordHash)]
        ));

        return { subjectId: id };
    }
}