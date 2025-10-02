import { IEntity } from "@domain/entities/IEntity";

export abstract class IRepository<TEntity: IEntity>{

    public abstract selectAll(): TEntity[];
    public abstract select(id: string): TEntity | null;
    public abstract add(entity: TEntity): string;
    public abstract update(id: string, entity: TEntity): void;
    public abstract delete(id: string): void;
}