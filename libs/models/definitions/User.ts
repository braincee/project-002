import { Table, Column, DataType } from "sequelize-typescript";

import { BaseModel } from "./BaseModel";

@Table({
  timestamps: true,
  tableName: "users",
})
export class User extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  public name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  public password!: string

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  public id!: number
}