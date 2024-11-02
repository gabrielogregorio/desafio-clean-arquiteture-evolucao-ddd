import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.mode';
import { ProductInfraRepository } from '@/infrastructure/product/repository/sequelize/product.repository';
import { ListProductUseCase } from '@/useCase/product/list/list.product.usecase';

describe('test list customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a product', async () => {
    const firstProduct = {
      id: 'example uuid1',
      name: 'example product1',
      price: 1500,
    };

    const secondProduct = {
      id: 'example uuid 2',
      name: 'example product2',
      price: 15002,
    };

    await ProductModel.create(firstProduct);
    await ProductModel.create(secondProduct);

    const productRepository = new ProductInfraRepository();

    const useCase = new ListProductUseCase(productRepository);

    const productFounded = await useCase.execute({});

    expect(productFounded).toEqual({ products: [firstProduct, secondProduct] });
  });

  it('should try find a inexistent product', async () => {
    const productRepository = new ProductInfraRepository();

    const useCase = new ListProductUseCase(productRepository);

    const result = await useCase.execute({ id: 'not-exists-id' });

    expect(result).toEqual({ products: [] });
  });
});
