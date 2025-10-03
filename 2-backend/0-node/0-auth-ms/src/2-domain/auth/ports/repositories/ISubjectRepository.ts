import { Injectable } from "@crosscutting/ioc/InjectableDecorator";
import { IRepository } from "./IRepository";
import { SubjectEntity } from "@domain/auth/entities/SubjectEntity";

@Injectable()
export abstract class ISubjectRepository extends IRepository<SubjectEntity>{

}