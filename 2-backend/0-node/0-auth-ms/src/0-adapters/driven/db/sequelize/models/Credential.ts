import { DataTypes, Sequelize } from 'sequelize';
import { IModel } from './IModel';
import { v7 as uuidv7 } from 'uuid';
import { CredentialEntity } from '@domain/auth/entities/CredentialEntity';

export class Credential extends IModel<CredentialEntity> {

    public async fromEntity(entity: CredentialEntity): Promise<any>{
        return {
            id: entity.id ?? undefined,
            subjectId: entity.subjectId ?? undefined,
            email: entity.email,
            passwordHash: entity.passwordHash
        };
    }

    public async toEntity(factory: any): Promise<CredentialEntity>{
        const obj = (this as any);
        return new CredentialEntity(obj.id, obj.subjectId, obj.email, obj.passwordHash, obj.createdAt, obj.updatedAt);
    }

    static setup(sequelize: Sequelize): void {
        this.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
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

        this.addHook('beforeCreate', async model => {
            model.set('id', uuidv7());
        });
    }

    static associate(models: any): void {
        this.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
    }
}