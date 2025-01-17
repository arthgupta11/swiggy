import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export default class Products extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false
  })
  public price!: JSON;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field : 'restraunt_id'
  })
  public restrauntId!: number;
}