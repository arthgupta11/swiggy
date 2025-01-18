import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({
  tableName: 'product_categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export default class ProductCategories extends BaseModel {

  @Column({
     type: DataType.INTEGER,
     allowNull: false,
     field : 'product_id'
    })
    public productId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field : 'category_id'
   })
   public categoryId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field : 'restraunt_id'
             
  })
  public restrauntId!: number;

}