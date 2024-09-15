import { CustomerEntity } from '../../customer/entity/customer';
import OrderEntity from '../entity/order';
import OrderItemEntity from '../entity/orderItem';
import { OrderDomainService } from './OrderDomainService';

describe('OrderDomainService unit test - domain service', () => {
  it('should place an order', () => {
    // Dentro de order
    // toda a vez que alguem contratar, ele vai ganahr um rewards.
    // Essa operação depende da compra, que depende do agregado de orderm, e depedne do agregado de customer.
    // Baseado nisso, os valores do rewards vai mudando
    // vamos criar o cartão fidelidade.
    const valueProduct = 24;
    const valuerewardsOnOrder = valueProduct / 2;
    const customer = new CustomerEntity({ id: 'c1', name: 'jay' });
    const item1 = new OrderItemEntity({ id: 'i1', name: 'nam1', price: 24, productId: 'product-id', quantity: 1 });

    // linguagem expressiva
    const order = OrderDomainService.placeOrder(customer, [item1]);

    expect(customer.rewardsPoints).toEqual(valuerewardsOnOrder);
    expect(order.total()).toEqual(valueProduct);
  });

  it('should get total of all orders', () => {
    const item1 = new OrderItemEntity({ id: 'i1', name: 'item 1', price: 100, productId: 'p2', quantity: 2 });
    const item2 = new OrderItemEntity({ id: 'i2', name: 'item 2', price: 50, productId: 'p2', quantity: 1 });
    const item3 = new OrderItemEntity({ id: 'i3', name: 'item 3', price: 10, productId: 'p2', quantity: 1 });

    const order1 = new OrderEntity({ id: 'id1', customerId: 'client-1', items: [item1, item2] });
    const order2 = new OrderEntity({ id: 'id2', customerId: 'client-1', items: [item2, item3] });

    const total = OrderDomainService.total([order1, order2]);

    expect(total).toEqual(310);
  });
});
