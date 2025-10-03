export abstract class IRepository<TEntity>{

    public abstract selectAll(): Promise<TEntity[]>;
    public abstract select(id: string): Promise<TEntity | null>;
    public abstract add(entity: TEntity): Promise<string>;
    public abstract update(id: string, entity: TEntity): Promise<void>;
    public abstract delete(id: string): Promise<void>;
}