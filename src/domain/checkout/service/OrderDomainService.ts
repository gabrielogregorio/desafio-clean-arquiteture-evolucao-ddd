import { uniqueId } from '../../../uuidWrapper';
import { CustomerEntity } from '../../customer/entity/customer';
import OrderEntity from '../entity/order';
import OrderItemEntity from '../entity/orderItem';

export class OrderDomainService {
  constructor() {}

  public static total(orders: OrderEntity[]) {
    // order domain services geralmente não estáticos para não gravarem status

    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }

  static placeOrder(customer: CustomerEntity, items: OrderItemEntity[]): OrderEntity {
    if (!items.length) {
      throw new Error('Order must have at least one items');
    }

    const order = new OrderEntity({
      customerId: customer.id,
      id: uniqueId(), // temos que gerar um id unicop
      items,
    });

    customer.addRewardsPoints(order.total() / 2);

    return order;
  }
}
