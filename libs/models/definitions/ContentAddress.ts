import { Table, Column, DataType } from "sequelize-typescript";

import { BaseModel } from "./BaseModel";

@Table({
  timestamps: true,
  tableName: "content_addresses",
})
export class Content extends BaseModel {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  public id!: number

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  public content_id!: number

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  public address_id!: number
}