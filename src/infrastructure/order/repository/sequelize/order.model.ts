import {  BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { OrderItemModel } from './order-item.model';
import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model';

@Table({ tableName: 'orders', timestamps: false })
export class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  // relaciona apenas ao id
  @ForeignKey(() => CustomerModel)  
  @Column({ allowNull: false })
  declare customer_id: string;

  // Para recuperar os dados completos - pertence a
  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel) // a ordem tem muitos items
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}
