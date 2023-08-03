import { Table, Column, DataType } from "sequelize-typescript";

import { BaseModel } from "./BaseModel";

@Table({
  timestamps: true,
  tableName: "logs",
})
export class Log extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  public log!: string

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  public id!: number
}