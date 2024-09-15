import { ProductEntity } from '@/product/entity/product';
import ProductYupValidator from '@/product/validator/product.yup';
import { ValidatorInterface } from '@/shared/validators/validator.interface';

export class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductEntity> {
    return new ProductYupValidator();
  }
}
