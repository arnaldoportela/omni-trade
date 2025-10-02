import { SessionEntity } from "@domain/entities/SessionEntity";
import { ISessionRepository } from "../../../../../2-domain/auth/ports/repositories/ISessionRepository";
import { Session } from "../models/Session";

export class SessionRepository extends ISessionRepository {
    public async selectAll(): SessionEntity[]{
        const entities: SessionEntity[] = [];
        const sessions = await Session.findAll();

        sessions.forEach(_ => { 
            entities.push(
                new SessionEntity(
                    _.id,
                    _.subjectId,
                    _.expiresAt,
                    _.createdAt,
                    _.updatedAt
                );
            );
        });

        return entities;
    }

    public async select(id: string): SessionEntity | null{

    }

    public async add(entity: SessionEntity): string{

    }

    public async update(id: string, entity: SessionEntity): void{

    }

    public async delete(id: string): void{

    }
}