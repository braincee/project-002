import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '@/libs/db';
import { UUIDV4 } from "@sequelize/core/types/dialects/abstract/data-types";

interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: UUIDV4;
  name: string;
  password: string;
}

export const User = sequelize.define<User>('User', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, { 
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});