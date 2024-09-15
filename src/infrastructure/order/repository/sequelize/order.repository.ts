import OrderEntity from '@/checkout/entity/order';
import OrderItemEntity from '@/checkout/entity/orderItem';
import { OrderRepositoryInterface } from '@/checkout/repository/order-repository-interface';
import { OrderItemModel } from '@/infrastructure/order/repository/sequelize/order-item.model';
import { OrderModel } from '@/infrastructure/order/repository/sequelize/order.model';

// 1 repository por agregado
export class OrderInfraRepository implements OrderRepositoryInterface {
  async create(entity: OrderEntity): Promise<void> {
    const data = {
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          order_id: entity.id,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        };
      }),
    };

    await OrderModel.create(data, {
      include: [{ model: OrderItemModel }],
    });
  }

  async find(id: string) {
    const data = await OrderModel.findOne({ where: { id }, include: ['items'] });

    if (!data) {
      throw new Error('Order not found');
    }

    let items: OrderItemEntity[] = [];
    if (data?.items.length) {
      items = data.items.map((item) => {
        return new OrderItemEntity({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.product_id,
          quantity: item.quantity,
        });
      });
    }
    return new OrderEntity({
      customerId: data?.customer_id,
      id: data?.id,
      items,
    });
  }

  async findAll(): Promise<OrderEntity[]> {
    const data = await OrderModel.findAll({ include: ['items'] });

    if (!data) {
      throw new Error('Order not found');
    }

    return data.map((order) => {
      let items: OrderItemEntity[] = [];
      if (order.items.length) {
        items = order.items.map((item) => {
          return new OrderItemEntity({
            id: item.id,
            name: item.name,
            price: item.price,
            productId: item.product_id,
            quantity: item.quantity,
          });
        });
      }

      return new OrderEntity({
        customerId: order?.customer_id,
        id: order?.id,
        items,
      });
    });
  }

  async update(entity: OrderEntity): Promise<void> {
    let order = await OrderModel.findByPk(entity.id, { include: [{ model: OrderItemModel, as: 'items' }] });
    if (!order) {
      throw new Error('Not ofund');
    }

    order.customer_id = entity.customerId;
    order.total = entity.total();
    await OrderItemModel.destroy({ where: { order_id: entity.id } });

    const itemsData = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      order_id: entity.id,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
    }));

    await OrderItemModel.bulkCreate(itemsData);

    await order.save();
  }
}
