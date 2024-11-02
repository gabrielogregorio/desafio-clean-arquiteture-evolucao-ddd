import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.mode';
import { ProductInfraRepository } from '@/infrastructure/product/repository/sequelize/product.repository';
import { UpdateProductUseCase } from '@/useCase/product/update/update.product.usecase';

describe('test update customer use case', () => {
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

  it('should update a product', async () => {
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
    const useCase = new UpdateProductUseCase(productRepository);

    const productCreated = await useCase.execute({
      id: productToFind.id,
      name: 'new-name',
      price: 2077,
    });

    expect(productCreated).toEqual({
      id: productToFind.id,
      name: 'new-name',
      price: 2077,
    });

    const statusDb = await ProductModel.findAll({ raw: true });
    expect(statusDb).toStrictEqual([{ id: productCreated.id, name: 'new-name', price: 2077 }]);
  });

  it('should thrown error on trying update a product that does not exist', async () => {
    const productRepository = new ProductInfraRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const wrapperRunUseCase = async () =>
      await useCase.execute({
        id: 'productNonExists',
        name: 'new-name',
        price: 2077,
      });

    await expect(wrapperRunUseCase).rejects.toThrow('product not found');
  });
});
