import argon2 from 'argon2';

import { AbstractCredentialRepository } from '@domain/auth/ports/repositories/AbstractCredentialRepository';
import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { ChangePasswordInputDto } from '../dtos/input/ChangePasswordInputDto';
import { AbstractChangePasswordUseCase } from './ports/AbstractChangePasswordUsecase';
import { CredentialEntity } from '@domain/auth/entities/CredentialEntity';

@Injectable()
export class ChangePasswordUseCase extends AbstractChangePasswordUseCase {
    private readonly credentialRepository: AbstractCredentialRepository;

    constructor(_credentialRepository: AbstractCredentialRepository) {
        super();

        this.credentialRepository = _credentialRepository;
    }

    async execute(data: ChangePasswordInputDto): Promise<any> {

        const credential = await this.credentialRepository.selectByEmail(data.email);

        if (!(credential && await credential?.validatePassword(data.password))) {
            throw Error("Invalid Credentials");
        }

        const newPasswordHash = await argon2.hash(data.newPassword, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1
        });

        await this.credentialRepository.delete(credential.id!);
        await this.credentialRepository.add(new CredentialEntity(
            undefined,
            credential.subjectId,
            credential.email,
            newPasswordHash
        ));
    }
}