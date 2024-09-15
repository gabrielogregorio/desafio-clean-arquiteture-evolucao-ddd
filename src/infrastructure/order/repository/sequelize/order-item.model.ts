import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { OrderModel } from './order.model';
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.mode';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  // relaciona apenas ao id
  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  // Para recuperar os dados completos - pertence a
  @BelongsTo(() => OrderModel)
  declare order: Awaited<OrderModel>;

  @Column({ allowNull: false })
  declare price: number;

  // relaciona apenas ao id
  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  // Para recuperar os dados completos - pertence a
  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @Column({ allowNull: false })
  declare quantity: number;
}
