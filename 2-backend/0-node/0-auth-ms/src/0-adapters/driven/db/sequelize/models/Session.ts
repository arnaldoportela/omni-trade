import { DataTypes, Sequelize } from 'sequelize';
import { IModel } from './IModel';
import { v7 as uuidv7 } from 'uuid';
import { SessionEntity } from '@domain/auth/entities/SessionEntity';

export class Session extends IModel<SessionEntity> {

    public fromEntity(entity: SessionEntity): any {
        return {
            id: entity.id ?? undefined,
            subjectId: entity.subjectId ?? undefined,
            expiresAt: entity.expiresAt
        };
    }

    public toEntity(): SessionEntity {
        const obj = (this as any);
        return new SessionEntity(obj.id, obj.subjectId, obj.expiresAt, obj.createdAt, obj.updatedAt);
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
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'Sessions'
        })

        this.addHook('beforeCreate', async model => {
            model.set('id', uuidv7());
        });
    }

    static associate(models: any): void {
        this.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
    }
}