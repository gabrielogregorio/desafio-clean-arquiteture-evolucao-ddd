import { ProductAggregateRepositoryInterface } from '@/domain/product/repository/product-agregate-repository';
import { ProductEntity } from '@/product/entity/product';
import { InputCreateProductDto, OutputCreateProductDto } from '@/useCase/product/create/create.product.dto';
import { uniqueId } from '../../../uuidWrapper';

export class CreateProductUseCase {
  private productRepository: ProductAggregateRepositoryInterface;

  constructor(productRepository: ProductAggregateRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = new ProductEntity({ id: uniqueId(), name: input.name, price: input.price });

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: input.price,
    };
  }
}
