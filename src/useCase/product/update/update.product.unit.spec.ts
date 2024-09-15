import { ProductEntity } from '@/product/entity/product';
import { ProductAggregateRepositoryInterface } from '@/product/repository/product-agregate-repository';
import { UpdateProductUseCase } from '@/useCase/product/update/update.product.usecase';

const product = new ProductEntity({ id: '123', name: 'abc', price: 390 });

const input = {
  id: product.id,
  name: 'Jack',
  price: 710,
};

const mockRepository = (): ProductAggregateRepositoryInterface => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('test update product use case', () => {
  it('should update a', async () => {
    const productRepository = mockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual(input);
  });

  it('should rejects with error on try update product with invalid params', async () => {
    const productRepository = mockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const input2 = {
      id: product.id,
      name: '',
      price: 830,
    };

    expect(() => {
      return useCase.execute(input2);
    }).rejects.toThrow('name is required');
  });

  it('should rejects with product not found', async () => {
    const productRepository = mockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    // @ts-ignore
    productRepository.find.mockImplementation(() => Promise.resolve(undefined));

    const input2 = {
      id: product.id,
      name: '',
      price: 830,
    };

    expect(() => {
      return useCase.execute(input2);
    }).rejects.toThrow('product not found');
  });
});
