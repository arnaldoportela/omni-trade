import { Model, Sequelize } from "sequelize"

export abstract class IModel extends Model {
    public createdAt!: Date;
    public updatedAt!: Date;
}