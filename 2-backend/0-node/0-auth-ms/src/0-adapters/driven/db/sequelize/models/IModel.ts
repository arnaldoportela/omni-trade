import { Model } from "sequelize"

export abstract class IModel<TEntity> extends Model {
    public abstract fromEntity(entity: TEntity): Promise<any>;
    public abstract toEntity(factory: any): Promise<TEntity>;
}