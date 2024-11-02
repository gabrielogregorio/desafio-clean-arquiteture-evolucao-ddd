import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.mode';
import { ProductInfraRepository } from '@/infrastructure/product/repository/sequelize/product.repository';
import { FindProductUseCase } from '@/useCase/product/find/find.product.usecase';

describe('test find customer use case', () => {
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
    const productToFind = {
      id: 'example uuid',
      name: 'example product',
      price: 1500,
    };

    await ProductModel.create({
      id: productToFind.id,
      name: productToFind.name,
      price: productToFind.price,
    });

    const productRepository = new ProductInfraRepository();

    const useCase = new FindProductUseCase(productRepository);

    const productFounded = await useCase.execute({ id: productToFind.id });

    expect(productFounded).toEqual({
      id: expect.anything(),
      name: productToFind.name,
      price: productToFind.price,
    });
  });

  it('should try find a inexistent product', async () => {
    const productRepository = new ProductInfraRepository();

    const useCase = new FindProductUseCase(productRepository);

    const wrap = async () => {
      await useCase.execute({ id: 'not-exists-id' });
    };

    await expect(wrap).rejects.toThrow('product not found');
  });
});
