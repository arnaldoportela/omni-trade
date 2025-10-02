import { IRepository } from "./IRepository";
import { SubjectEntity } from "@domain/entities/SubjectEntity";

export abstract class ISubjectRepository extends IRepository<SubjectEntity>{

}