import { CredentialEntity } from "@domain/auth/entities/CredentialEntity";
import { AbstractCredentialRepository } from "@domain/auth/ports/repositories/AbstractCredentialRepository";
import { Credential } from "../models/Credential";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";
import { Subject } from "../models/Subject";

@Injectable()
export class CredentialRepository extends AbstractCredentialRepository {
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

        return credential?.toEntity(null) ?? null;
    }

    public async add(entity: CredentialEntity): Promise<string> {
        const model = await new Credential().fromEntity(entity);
        const e: any = await Credential.create(model);

        return e.id;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async update(id: string, entity: CredentialEntity): Promise<void> {

    }

    public async delete(id: string): Promise<void> {
        await Credential.destroy({
            where: { id }
        })
    }
}