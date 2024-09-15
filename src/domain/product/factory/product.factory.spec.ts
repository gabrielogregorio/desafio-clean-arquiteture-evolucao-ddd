import { ProductEntity } from '@/product/entity/product';
import { ProductBEntity } from '@/product/entity/productB';
import { ProductFactory } from '@/product/factory/product.factory';

describe('Product factory unit test', () => {
  it('should create a product type A', () => {
    const product = ProductFactory.create({
      name: 'Product a',
      price: 10,
      type: 'a',
    });

    expect(product.id).toBeDefined();
    expect(product.name).toEqual('Product a');
    expect(product.price).toEqual(10);

    expect(product instanceof ProductEntity).toBeTruthy();
  });

  it('should create a product type B', () => {
    const product = ProductFactory.create({
      name: 'Product b',
      price: 10,
      type: 'b',
    });

    expect(product.id).toBeDefined();
    expect(product.name).toEqual('Product b');
    expect(product.price).toEqual(20);

    expect(product instanceof ProductBEntity).toBeTruthy();
  });

  it('should thown error on type is invalid', () => {
    expect(() => {
      ProductFactory.create({
        name: 'Product b',
        price: 10,
        type: 'c' as 'b',
      });
    }).toThrow('type c is invalid');
  });
});
