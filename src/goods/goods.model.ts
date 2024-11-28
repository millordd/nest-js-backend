import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Goods extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  addedDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  comments: string;
}
