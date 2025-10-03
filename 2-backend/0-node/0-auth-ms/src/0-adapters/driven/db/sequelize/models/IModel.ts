import { Model } from "sequelize"

export abstract class IModel<TEntity> extends Model {
    public abstract fromEntity(entity: TEntity): any;
    public abstract toEntity(): TEntity;
}