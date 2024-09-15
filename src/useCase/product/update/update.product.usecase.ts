import { ProductAggregateRepositoryInterface } from '@/product/repository/product-agregate-repository';
import { InputUpdateProductDto, OutputUpdateProductDto } from '@/useCase/product/update/update.product.dto';

export class UpdateProductUseCase {
  private productRepository: ProductAggregateRepositoryInterface;
  constructor(productRepository: ProductAggregateRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) {
      throw new Error('product not found');
    }

    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
