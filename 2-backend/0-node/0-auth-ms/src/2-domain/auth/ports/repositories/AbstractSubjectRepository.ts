import { Injectable } from "@crosscutting/ioc/InjectableDecorator";
import { AbstractRepository } from "./AbstractRepository";
import { SubjectEntity } from "@domain/auth/entities/SubjectEntity";

@Injectable()
export abstract class AbstractSubjectRepository extends AbstractRepository<SubjectEntity>{

}