import { ProductEntity } from '@/product/entity/product';
import { ValidatorInterface } from '@/shared/validators/validator.interface';
import * as yup from 'yup';

export default class ProductYupValidator implements ValidatorInterface<ProductEntity> {
  validate(entity: ProductEntity): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('id is required'),
          name: yup.string().required('name is required'),
          price: yup.number().min(0, 'Price must be greater than zero'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          { abortEarly: false },
        );
    } catch (e) {
      const errors = e as yup.ValidationError;
      errors.errors.forEach((error) => {
        entity.notification.addError({
          context: 'product',
          message: error,
        });
      });
    }
  }
}
