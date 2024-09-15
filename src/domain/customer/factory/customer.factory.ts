import { AddressValueObject } from '@/customer/value-object/address';
import { uniqueId } from '../../../uuidWrapper';
import { CustomerEntity } from '@/customer/entity/customer';

export class CustomerFactory {
  // O CORRETO SERIA RETORNAR UMA INTERFACE
  // AQUI TA DEPENDENTDO DA IMPLEMENTACAO DE CUSTOMER ENTITY
  public static create(name: string): CustomerEntity {
    return new CustomerEntity({ id: uniqueId(), name });
  }

  public static createWithAddress(name: string, address: AddressValueObject): CustomerEntity {
    const customer = new CustomerEntity({ id: uniqueId(), name });

    customer.changeAddress(address);
    return customer;
  }
}
