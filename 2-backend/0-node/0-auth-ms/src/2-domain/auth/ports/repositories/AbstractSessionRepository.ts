import { Injectable } from "@crosscutting/ioc/InjectableDecorator";
import { AbstractRepository } from "./AbstractRepository";
import { SessionEntity } from "@domain/auth/entities/SessionEntity";

@Injectable()
export abstract class AbstractSessionRepository extends AbstractRepository<SessionEntity>{

}