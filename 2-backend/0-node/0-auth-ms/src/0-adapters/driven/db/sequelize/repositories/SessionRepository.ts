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
                SessionEntity.create(
                    _.id,
                    _.subjectId,
                    _.finferprint,
                    _.idleExpireDate,
                    _.maxExpireDate,
                    _.createdAt,
                    _.updatedAt
                )
            );
        });

        return entities;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async select(id: string): Promise<SessionEntity | null> {
        return null;
    }

    public async add(entity: SessionEntity): Promise<string> {
        const model = await new Session().fromEntity(entity);
        const e: any = await Session.create(model);

        return e.id;
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async update(id: string, entity: SessionEntity): Promise<void> {

    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async delete(id: string): Promise<void> {

    }
}