import { ISubjectRepository } from "@domain/auth/ports/repositories/ISubjectRepository";
import { Subject } from "../models/Subject";
import { SubjectEntity } from "@domain/auth/entities/SubjectEntity";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";
import { Credential } from "../models/Credential";

@Injectable()
export class SubjectRepository extends ISubjectRepository {
    public async selectAll(): Promise<SubjectEntity[]> {
        const entities: SubjectEntity[] = [];
        const subjects = await Subject.findAll();

        subjects.forEach((_:any) => {
            entities.push(
                new SubjectEntity(
                    _.id,
                    _.name,
                    [],
                    [],
                    _.createdAt,
                    _.updatedAt
                )
            );
        });

        return entities;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async select(id: string): Promise<SubjectEntity | null> {
        return null
    }

    public async add(entity: SubjectEntity): Promise<string> {
        const model = new Subject().fromEntity(entity);
        const e:any = await Subject.create(model,
            {
                include: [
                    { model: Credential, as: "credentials" }
                ]
            });

        return e.id;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async update(id: string, entity: SubjectEntity): Promise<void> {

    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async delete(id: string): Promise<void> {

    }
}