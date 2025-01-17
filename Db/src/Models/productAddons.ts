import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({
  tableName: 'product_addons',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export default class ProductAddons extends BaseModel {

  @Column({
     type: DataType.INTEGER,
     allowNull: false,
     field: 'product_id'
    })
    public productId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'addon_id'
   })
   public addonId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field : 'restraunt_id'
  })
  public restrauntId!: number;
}