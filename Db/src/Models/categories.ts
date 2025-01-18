import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export default class Categories extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'restraunt_id'
  })
  public restrauntId!: number;

}