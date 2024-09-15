import { OrderFactory } from '@/checkout/factory/order.factory';
import { uniqueId } from '../../../uuidWrapper';

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps = {
      id: uniqueId(),
      customerId: uniqueId(),
      items: [
        {
          id: uniqueId(),
          name: 'product1',
          productId: uniqueId(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toEqual(1);
  });
});
