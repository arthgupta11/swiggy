import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({
  tableName: 'product_subcategories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export default class ProductSubcategories extends BaseModel {

  @Column({
     type: DataType.INTEGER,
     allowNull: false,
     field:'product_id'
    })
    public productId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'subcategory_id'
   })
   public subcategoryId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public restrauntId!: number;
}