import { ProductEntity } from './product';

describe('Product unit tests', () => {
  it('should thrown error on id is empty', () => {
    expect(() => {
      new ProductEntity({ id: '123', name: '', price: 100 });
    }).toThrow('product: name is required');
  });

  it('should thrown error on name is empty', () => {
    expect(() => {
      new ProductEntity({ id: '', name: 'name', price: 100 });
    }).toThrow('product: id is required');
  });

  it('should error list when name and id is empty', () => {
    expect(() => {
      new ProductEntity({ id: '', name: '', price: 100 });
    }).toThrow('product: id is required, product: name is required');
  });

  it('should thrown error on price is less than 0', () => {
    expect(() => {
      new ProductEntity({ id: '123', name: 'name', price: -1 });
    }).toThrow('Price must be greater than zero');
  });

  it('should create product on all data is ok', () => {
    expect(new ProductEntity({ id: '123', name: 'name', price: 1 })).toBeDefined();
  });

  it('should change name product ', () => {
    let product = new ProductEntity({ id: '123', name: 'name', price: 1 });

    product.changeName('abc');

    expect(product.name).toBe('abc');
  });

  it('should change proce ', () => {
    let product = new ProductEntity({ id: '123', name: 'name', price: 1 });

    product.changePrice(500);

    expect(product.price).toBe(500);
  });
});
