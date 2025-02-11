import { Column, DataType, Model } from 'sequelize-typescript';

export default class BaseModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  public createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'modified_at',
  })
  public modifiedAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'deleted_at',
  })
  public deletedAt!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_deleted',
  })
  public isDeleted!: boolean;
}
