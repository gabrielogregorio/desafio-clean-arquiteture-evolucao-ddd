import { RepositoryInterface } from '../../@shared/repository/generic-repository-interface';
import { CustomerEntity } from '../entity/customer';

export interface CustomerAggregateRepositoryInterface extends RepositoryInterface<CustomerEntity> {}
