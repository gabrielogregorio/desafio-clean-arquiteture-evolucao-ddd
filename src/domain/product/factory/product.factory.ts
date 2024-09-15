import { ProductEntity } from '@/product/entity/product';
import { ProductInterface } from '@/product/entity/product.interface';
import { ProductBEntity } from '@/product/entity/productB';
import { uniqueId } from '../../../uuidWrapper';

export class ProductFactory {
  public static create({ name, price, type }: { name: string; price: number; type: 'a' | 'b' }): ProductInterface {
    if (type === 'a') {
      return new ProductEntity({ id: uniqueId(), name, price });
    }

    if (type === 'b') {
      return new ProductBEntity({ id: uniqueId(), name, price });
    }

    throw new Error(`type ${type} is invalid`);
  }
}
