import { RepositoryInterface } from '../../@shared/repository/generic-repository-interface';
import OrderEntity from '../entity/order';

export interface OrderRepositoryInterface extends RepositoryInterface<OrderEntity> {
  // example  findByName(name: string)
}
