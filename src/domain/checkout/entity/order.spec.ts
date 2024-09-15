import OrderEntity from './order';
import OrderItemEntity from './orderItem';

describe('', () => {
  it('should thrown error on id is empty', () => {
    expect(() => {
      new OrderEntity({ id: '', customerId: 'name', items: [] });
    }).toThrow('id is required');
  });

  it('should thrown error on customer id is empty', () => {
    expect(() => {
      new OrderEntity({ id: '123', customerId: '', items: [] });
    }).toThrow('customerId is required');
  });

  it('should thrown error on items is zero', () => {
    expect(() => {
      new OrderEntity({ id: '123', customerId: '456', items: [] });
    }).toThrow('Items are required');
  });

  it('should calculate total', () => {
    const item1 = new OrderItemEntity({ id: '1', name: 'celular', price: 100, productId: 'p1', quantity: 1 });
    const order = new OrderEntity({ id: '123', customerId: '456', items: [item1] });

    const total = order.total();

    expect(total).toBe(100);

    const item2 = new OrderItemEntity({ id: '2', name: 'celular 2', price: 75, productId: 'p2', quantity: 1 });
    const order2 = new OrderEntity({ id: '123', customerId: '456', items: [item1, item2] });

    const total2 = order2.total();
    expect(total2).toBe(175);
  });

  it('should calculate total', () => {
    const item1 = new OrderItemEntity({ id: '1', name: 'celular', price: 100, productId: 'p1', quantity: 5 });

    const order = new OrderEntity({ id: '123', customerId: '456', items: [item1] });

    const total = order.total();

    expect(total).toBe(500);
  });

  it('should thrown error on is greater zero calculate total', () => {
    expect(() => {
      new OrderEntity({
        id: '123',
        customerId: '456',
        items: [new OrderItemEntity({ id: '1', name: 'celular', price: 100, productId: 'p1', quantity: 0 })],
      });
    }).toThrow('qtd needs greater zero');
  });

  it('should thrown error on is positive', () => {
    expect(() => {
      new OrderEntity({
        id: '123',
        customerId: '456',
        items: [new OrderItemEntity({ id: '1', name: 'celular', price: 100, productId: 'p1', quantity: -1 })],
      });
    }).toThrow('qtd needs greater zero');
  });
});
