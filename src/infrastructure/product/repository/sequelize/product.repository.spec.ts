import { Sequelize } from 'sequelize-typescript';
import { ProductInfraRepository } from './product.repository';
import { ProductModel } from './product.mode';
import { ProductEntity } from '@/product/entity/product';

describe('product repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductInfraRepository();
    const product = new ProductEntity({ id: '1', name: 'name example', price: 123 });

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel?.toJSON()).toStrictEqual({
      id: '1',
      name: 'name example',
      price: 123,
    });
  });

  it('should update product', async () => {
    const productRepository = new ProductInfraRepository();

    const product = new ProductEntity({ id: '2', name: 'name example', price: 123 });

    productRepository.create(product);

    product.changeName('new name');
    product.changePrice(456);

    productRepository.update(product);

    const productDb = await ProductModel.findOne({
      where: {
        id: '2',
      },
    });

    expect(productDb?.toJSON()).toStrictEqual({
      id: '2',
      name: 'new name',
      price: 456,
    });
  });

  it('should a find product', async () => {
    const productRepository = new ProductInfraRepository();

    const product = new ProductEntity({
      id: 'abc',
      name: 'name',
      price: 2077,
    });

    await productRepository.create(product);

    const productSave = await productRepository.find('abc');

    expect(productSave).toEqual(product);
  });

  it('should find a many products', async () => {
    const repository = new ProductInfraRepository();

    const product1 = new ProductEntity({
      id: '1',
      name: 'p1',
      price: 10,
    });

    const product2 = new ProductEntity({
      id: '2',
      name: 'p2',
      price: 20,
    });
    const product3 = new ProductEntity({
      id: '3',
      name: 'p3',
      price: 30,
    });

    repository.create(product1);
    repository.create(product2);
    repository.create(product3);

    const products = await repository.findAll();

    expect(products).toEqual([product1, product2, product3]);
  });
});
