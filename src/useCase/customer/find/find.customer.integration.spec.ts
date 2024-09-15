import { CustomerEntity } from '@/customer/entity/customer';
import { AddressValueObject } from '@/customer/value-object/address';
import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model';
import { CustomerInfraRepository } from '@/infrastructure/customer/repository/sequelize/customer.repository';
import { Sequelize } from 'sequelize-typescript';
import { FindCustomerUseCase } from '@/useCase/customer/find/find.customer.usecase';

describe('test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should a find a customer', async () => {
    // teste de integração
    const customer = new CustomerEntity({ id: '123', name: 'abc' });
    const address = new AddressValueObject({ city: 'city', number: 123, street: '12313123', zip: '21132' });
    const customerRepository = new CustomerInfraRepository();
    const useCase = new FindCustomerUseCase(customerRepository);
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: '123',
    };

    const outputExpected = {
      id: '123',
      name: 'abc',
      address: {
        city: 'city',
        number: 123,
        street: '12313123',
        zip: '21132',
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(outputExpected);
  });
});
