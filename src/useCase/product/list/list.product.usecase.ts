import { ProductInterface } from '@/product/entity/product.interface';
import { ProductAggregateRepositoryInterface } from '@/product/repository/product-agregate-repository';
import { InputListProductDto, OutputListProductDto } from '@/useCase/product/list/list.product.dto';

class OutputMapper {
  static toOutput(products: ProductInterface[]): OutputListProductDto {
    return {
      products: products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      }),
    };
  }
}

export class ListProductUseCase {
  private productRepository: ProductAggregateRepositoryInterface;
  constructor(productRepository: ProductAggregateRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(_input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return OutputMapper.toOutput(products);
  }
}
