import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({
  tableName: 'category_subcategories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export default class CategorySubcategories extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'category_id',
  })
  public categoryId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'subcategory_id',
  })
  public subcategoryId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'restraunt_id',
  })
  public restrauntId!: number;
}
