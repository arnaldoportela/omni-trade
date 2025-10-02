import { DataTypes, Sequelize } from 'sequelize';
import { IModel } from './IModel';
import { v7 as uuidv7 } from 'uuid';

export class Session extends IModel{

    public id!: string;
    public subjectId!: string;
    public expiresAt!: Date;

    static setup(sequelize: Sequelize): void{
        Session.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: () => uuidv7(),
                primaryKey: true,
                allowNull: false
            },
            subjectId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'Sessions'
        })
    }

    static associate(models: any): void {
        Session.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject'});
    }
}