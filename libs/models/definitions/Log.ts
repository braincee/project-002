import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '@/libs/db';
import { UUIDV4 } from "@sequelize/core/types/dialects/abstract/data-types";

interface Log extends Model<InferAttributes<Log>, InferCreationAttributes<Log>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: UUIDV4;
  log: string;
}

export const Log = sequelize.define<Log>('Log', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  log: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, { 
  tableName: 'logs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});