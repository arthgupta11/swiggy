import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({
  tableName: 'products_recommended_products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export default class ProductRecommendedProducts extends BaseModel {

  @Column({
     type: DataType.INTEGER,
     allowNull: false,
     field : 'product_id'
    })
    public productId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field : 'recommended_productid'
   })
   public recommendedProductId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field : 'restruant_id'
  })
  public restrauntId!: number;
}