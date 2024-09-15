import { CustomerFactory } from '@/customer/factory/customer.factory';
import { AddressValueObject } from '@/customer/value-object/address';

describe('Product factory unit test', () => {
  it('should create a customer factory', () => {
    // CustomerFactory.createCustomer - seria um péssimo nome
    const customer = CustomerFactory.create('jon');

    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual('jon');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer factory with address', () => {
    const address = new AddressValueObject({
      city: 'city',
      number: 123,
      street: 'street',
      zip: '123',
    });

    const customer = CustomerFactory.createWithAddress('jon', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual('jon');
    expect(customer.address).toEqual(address);
  });
});
