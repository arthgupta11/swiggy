import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({
  tableName: 'restraunts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export default class Restraunts extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;
}
