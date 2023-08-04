
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '@/libs/db';
import { UUIDV4 } from "@sequelize/core/types/dialects/abstract/data-types";

interface Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: UUIDV4;
  address: string;
}

export const Address = sequelize.define<Address>('Address', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, { 
  tableName: 'addresses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});