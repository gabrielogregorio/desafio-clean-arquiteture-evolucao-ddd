import { CustomerEntity } from '@/customer/entity/customer';
import CustomerYupValidator from '@/customer/validator/customer.yup';
import { ValidatorInterface } from '@/shared/validators/validator.interface';

// Essafactory retorna um validator
// o yup é um cara que pode fazer isso hoje
export class CustomerValidatorFactory {
  static create(): ValidatorInterface<CustomerEntity> {
    return new CustomerYupValidator();
  }
}
