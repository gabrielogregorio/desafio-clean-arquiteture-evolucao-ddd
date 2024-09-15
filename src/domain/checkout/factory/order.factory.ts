import OrderEntity from '@/checkout/entity/order';
import OrderItemEntity from '@/checkout/entity/orderItem';

type OrderFactoryProps = {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
};

export class OrderFactory {
  // OrderEntity deveria ser uma interface e não depender de implementação
  // concreta
  public static create(orderFactoryProps: OrderFactoryProps): OrderEntity {
    const items = orderFactoryProps.items.map((item) => {
      return new OrderItemEntity({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
      });
    });

    return new OrderEntity({
      customerId: orderFactoryProps.customerId,
      id: orderFactoryProps.id,
      items,
    });
  }
}
