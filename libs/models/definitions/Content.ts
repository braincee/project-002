import { Table, Column, DataType } from "sequelize-typescript";

import { BaseModel } from "./BaseModel";

@Table({
  timestamps: true,
  tableName: "content",
})
export class Content extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  public content!: string

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  public id!: number
}