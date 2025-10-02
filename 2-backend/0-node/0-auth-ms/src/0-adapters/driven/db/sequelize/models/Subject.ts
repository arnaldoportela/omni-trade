import { DataTypes, Sequelize } from 'sequelize';
import { IModel } from './IModel';
import { v7 as uuidv7 } from 'uuid';

export class Subject extends IModel{

    public id!: string;
    public name!: string;

    static setup(sequelize: Sequelize): void{
        Subject.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: () => uuidv7(),
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'Subjects'
        });
    }

    static associate(models: any): void{
        Subject.hasMany(models.Credential, { foreignKey: 'subjectId', as: 'credentials' });
        Subject.hasMany(models.Session, { foreignKey: 'subjectId', as: 'sessions' });
    }
}