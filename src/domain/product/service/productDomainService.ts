import { ProductEntity } from '../entity/product';

export class ProductDomainService {
  static increasePrice(products: ProductEntity[], percentage: number): void {
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
  }
}

