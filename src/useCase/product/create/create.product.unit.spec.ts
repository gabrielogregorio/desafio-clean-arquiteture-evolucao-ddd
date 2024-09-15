import { ProductAggregateRepositoryInterface } from '@/product/repository/product-agregate-repository';
import { InputCreateProductDto } from '@/useCase/product/create/create.product.dto';
import { CreateProductUseCase } from '@/useCase/product/create/create.product.usecase';

const mockRepository = (): ProductAggregateRepositoryInterface => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('test find product use case', () => {
  it('should create a product', async () => {
    const productRepository = mockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: 'celular',
      price: 870,
    };

    const outputExpected = {
      name: 'celular',
      price: 870,
      id: expect.any(String),
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(outputExpected);
  });

  it('should rejects with error', async () => {
    const productRepository = mockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'celular',
      price: -1,
    };

    expect(async () => {
      return await useCase.execute(input);
    }).rejects.toThrow('Price must be greater than zero');
  });
});
