import { IRepository } from "./IRepository";
import { SessionEntity } from "@domain/entities/SessionEntity";

export abstract class ISessionRepository extends IRepository<SessionEntity>{

}