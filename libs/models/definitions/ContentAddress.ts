import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '@/libs/db';
import { UUIDV4 } from "@sequelize/core/types/dialects/abstract/data-types";

interface ContentAddress extends Model<InferAttributes<ContentAddress>, InferCreationAttributes<ContentAddress>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: UUIDV4;
  content_id: number;
  address_id: number;
}

export const ContentAddress = sequelize.define<ContentAddress>('ContentAddress', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  content_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  address_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
}, { 
  tableName: 'content_addresses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});