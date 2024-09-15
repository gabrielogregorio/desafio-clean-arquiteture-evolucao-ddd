import { ProductAggregateRepositoryInterface } from '@/product/repository/product-agregate-repository';
import { InputFindProductDto, OutputFindProductDto } from '@/useCase/product/find/find.product.dto';

export class FindProductUseCase {
  private productRepository: ProductAggregateRepositoryInterface;
  constructor(productRepository: ProductAggregateRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) {
      throw new Error('product not found');
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
