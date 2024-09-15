// ok, isso viola um poucos dos padrões de sepração
// pois acopla uma lib diretamente ao dominio
// mas tendo o nome do arquivo e tentano seguir as boas práticas, podemos sim tomar essa liberdade
// e acoplar o yup ao domainm/cliente.
// é uma classe concreta.

import { CustomerEntity } from '@/customer/entity/customer';
import { ValidatorInterface } from '@/shared/validators/validator.interface';
import * as yup from 'yup';

// estamos gerando um acoplamento, mas como tem a interface no meio, a classe entity não irá saber que estamos usando o yup

export default class CustomerYupValidator implements ValidatorInterface<CustomerEntity> {
  validate(entity: CustomerEntity): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('id is invalid'),
          name: yup.string().required('name is invalid'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          { abortEarly: false },
        );
    } catch (e) {
      const errors = e as yup.ValidationError;
      errors.errors.forEach((error) => {
        entity.notification.addError({
          context: 'customer',
          message: error,
        });
      });
    }
  }
}
