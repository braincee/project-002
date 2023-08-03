import { Table, Column, DataType } from "sequelize-typescript";

import { BaseModel } from "./BaseModel";

@Table({
  timestamps: true,
  tableName: "addresses",
})
export class Address extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  public address!: string

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  public id!: number
}