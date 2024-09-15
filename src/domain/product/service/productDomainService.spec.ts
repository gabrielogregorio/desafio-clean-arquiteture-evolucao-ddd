import { ProductEntity } from '../entity/product';
import { ProductDomainService } from './productDomainService';

describe('', () => {
  it('should change the prices of all products', () => {
    const product1 = new ProductEntity({ id: '12', name: 'example', price: 10 });
    const product2 = new ProductEntity({ id: '12', name: 'example', price: 100 });

    const increaseInPercent = 100;
    const products = [product1, product2];
    ProductDomainService.increasePrice(products, increaseInPercent);

    expect(product1.price).toEqual(20);
    expect(product2.price).toEqual(200);
  });
});
