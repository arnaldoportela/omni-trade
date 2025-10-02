import { SubjectEntity } from "@domain/entities/SubjectEntity";
import { ISubjectRepository } from "../../../../../2-domain/auth/ports/repositories/ISubjectRepository";
import { Subject } from "../models/Subject";

export class SubjectRepository extends ISubjectRepository {
    public async selectAll(): SubjectEntity[]{
        const entities: SubjectEntity[] = [];
        const subjects = await Subject.findAll();

        subjects.forEach(_ => { 
            entities.push(
                new SubjectEntity(
                    _.id,
                    _.name,
                    [],
                    [],
                    _.createdAt,
                    _.updatedAt
                );
            );
        });

        return entities;
    }

    public async select(id: string): SubjectEntity | null{

    }

    public async add(entity: SubjectEntity): string{

    }

    public async update(id: string, entity: SubjectEntity): void{

    }

    public async delete(id: string): void{

    }
}