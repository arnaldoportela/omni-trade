import { CredentialEntity } from "@domain/auth/entities/CredentialEntity";
import { ICredentialRepository } from "@domain/auth/ports/repositories/ICredentialRepository";
import { Credential } from "../models/Credential";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";
import { Subject } from "../models/Subject";

@Injectable()
export class CredentialRepository extends ICredentialRepository {
    public async selectAll(): Promise<CredentialEntity[]> {
        const entities: CredentialEntity[] = [];
        const credentials = await Credential.findAll();

        credentials.forEach((_: any) => {
            entities.push(
                new CredentialEntity(
                    _.id,
                    _.subjectId,
                    _.email,
                    "***",
                    _.createdAt,
                    _.updatedAt
                )
            );
        });

        return entities;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async select(id: string): Promise<CredentialEntity | null> {
        return null;
    }

    public async selectByEmail(email: string): Promise<CredentialEntity | null> {
        const credential = await Credential.findOne({
            where: { email },
            include: [
                { model: Subject, as: "subject" }
            ]
        });

        return credential?.toEntity() ?? null;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async add(entity: CredentialEntity): Promise<string> {
        return "";
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async update(id: string, entity: CredentialEntity): Promise<void> {

    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async delete(id: string): Promise<void> {

    }
}