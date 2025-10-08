import { DataTypes, Sequelize } from 'sequelize';
import { IModel } from './IModel';
import { v7 as uuidv7 } from 'uuid';
import { SubjectEntity } from '@domain/auth/entities/SubjectEntity';
import { Credential } from './Credential';
import { Session } from './Session';

export class Subject extends IModel<SubjectEntity> {
    public async fromEntity(entity: SubjectEntity): Promise<any> {
        return {
            id: entity.id ?? undefined,
            name: entity.name,
            credentials: entity.credentials?.map(c => new Credential().fromEntity(c)) ?? undefined,
            sessions: entity.sessions?.map(c => new Session().fromEntity(c)) ?? undefined,
        };
    }

    public async toEntity(factory: any): Promise<SubjectEntity> {
        const obj = (this as any);
        return new SubjectEntity(obj.id, obj.name, [], [], obj.createdAt, obj.updatedAt);
    }

    static setup(sequelize: Sequelize): void {
        this.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'Subjects'
        });

        this.addHook('beforeCreate', async model => {
            model.set('id', uuidv7());
        });
    }

    static associate(models: any): void {
        this.hasMany(models.Credential, { foreignKey: 'subjectId', as: 'credentials' });
        this.hasMany(models.Session, { foreignKey: 'subjectId', as: 'sessions' });
    }
}