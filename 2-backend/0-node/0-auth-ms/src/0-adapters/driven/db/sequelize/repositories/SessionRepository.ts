import { SessionEntity } from "@domain/auth/entities/SessionEntity";
import { ISessionRepository } from "@domain/auth/ports/repositories/ISessionRepository";
import { Session } from "../models/Session";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

@Injectable()
export class SessionRepository extends ISessionRepository {
    public async selectAll(): Promise<SessionEntity[]> {
        const entities: SessionEntity[] = [];
        const sessions = await Session.findAll();

        sessions.forEach((_: any) => {
            entities.push(
                new SessionEntity(
                    _.id,
                    _.subjectId,
                    _.expiresAt,
                    _.createdAt,
                    _.updatedAt
                )
            );
        });

        return entities;
    }

    public async select(id: string): Promise<SessionEntity | null> {
        return null;
    }

    public async add(entity: SessionEntity): Promise<string> {
        const model = new Session().fromEntity(entity);
        const e:any = await Session.create(model);

        return e.id;
    }

    public async update(id: string, entity: SessionEntity): Promise<void> {

    }

    public async delete(id: string): Promise<void> {

    }
}