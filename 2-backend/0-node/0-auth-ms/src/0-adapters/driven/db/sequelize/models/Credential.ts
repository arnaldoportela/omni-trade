import { DataTypes, Sequelize } from 'sequelize';
import { IModel } from './IModel';
import { v7 as uuidv7 } from 'uuid';

export class Credential extends IModel{

    public id!: string;
    public subjectId!: string;
    public email!: string;
    public passwordHash!: string;

    static setup(sequelize: Sequelize): void{
        Credential.init({
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
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'Credentials'
        });
    }

    static associate(models: any): void{
        Credential.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
    }
}