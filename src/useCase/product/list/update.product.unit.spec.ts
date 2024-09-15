import { ProductEntity } from '@/product/entity/product';
import { ProductAggregateRepositoryInterface } from '@/product/repository/product-agregate-repository';
import { ListProductUseCase } from '@/useCase/product/list/update.product.usecase';

const product1 = new ProductEntity({
  id: '123',
  name: 'example',
  price: 180,
});

const product2 = new ProductEntity({
  id: '456',
  name: 'example 2',
  price: 200,
});

const mockRepository = (): ProductAggregateRepositoryInterface => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('test list customer use case', () => {
  it('should a list a customer', async () => {
    const productRepository = mockRepository();
    const useCase = new ListProductUseCase(productRepository);

    const result = await useCase.execute({});

    expect(result.products).toStrictEqual([
      {
        id: product1.id,
        name: product1.name,
        price: product1.price,
      },
      {
        id: product2.id,
        name: product2.name,
        price: product2.price,
      },
    ]);
  });
});
