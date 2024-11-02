import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.mode';
import { ProductInfraRepository } from '@/infrastructure/product/repository/sequelize/product.repository';
import { CreateProductUseCase } from '@/useCase/product/create/create.product.usecase';

describe('test create customer use case', () => {
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

  it('should create a product', async () => {
    const input = {
      name: 'samsung',
      price: 4500,
    };
    const productRepository = new ProductInfraRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const productCreated = await useCase.execute({
      name: input.name,
      price: input.price,
    });

    expect(productCreated).toEqual({
      id: expect.anything(),
      name: input.name,
      price: input.price,
    });

    const statusDb = await ProductModel.findAll({ raw: true });
    expect(statusDb).toStrictEqual([{ id: productCreated.id, name: input.name, price: input.price }]);
  });
});
