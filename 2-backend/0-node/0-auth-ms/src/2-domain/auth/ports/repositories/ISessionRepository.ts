import { Injectable } from "@crosscutting/ioc/InjectableDecorator";
import { IRepository } from "./IRepository";
import { SessionEntity } from "@domain/auth/entities/SessionEntity";

@Injectable()
export abstract class ISessionRepository extends IRepository<SessionEntity>{

}