import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '@/libs/db';
import { UUIDV4 } from "@sequelize/core/types/dialects/abstract/data-types";

interface Content extends Model<InferAttributes<Content>, InferCreationAttributes<Content>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: UUIDV4;
  content: string;
}

export const Content = sequelize.define<Content>('Content', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, { 
  tableName: 'contents',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});