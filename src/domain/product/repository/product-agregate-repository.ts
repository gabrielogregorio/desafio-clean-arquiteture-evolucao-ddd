import { ProductInterface } from '@/product/entity/product.interface';
import { RepositoryInterface } from '../../@shared/repository/generic-repository-interface';
import { ProductEntity } from '../entity/product';

export interface ProductAggregateRepositoryInterface extends RepositoryInterface<ProductInterface> {
  // example  findByName(name: string)
}
