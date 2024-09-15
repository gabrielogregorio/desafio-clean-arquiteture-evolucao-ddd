import { ProductEntity } from '@/product/entity/product';
import { ProductAggregateRepositoryInterface } from '@/product/repository/product-agregate-repository';
import { FindProductUseCase } from '@/useCase/product/find/find.product.usecase';

const product = new ProductEntity({
  id: '123',
  name: 'abc',
  price: 120,
});

const mockRepository = (): ProductAggregateRepositoryInterface => {
  return {
    find: jest.fn().mockReturnValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('test find product use case', () => {
  it('should a find a product', async () => {
    const productRepository = mockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: product.id,
    };

    const outputExpected = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(outputExpected);
  });

  it('should not found', () => {
    const productRepository = mockRepository();
    // @ts-ignore
    productRepository.find.mockImplementation(() => {
      throw new Error('product not found');
    });
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: 'error example',
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('product not found');
  });
});
