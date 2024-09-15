import { CustomerEntity } from '@/customer/entity/customer';
import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { AddressValueObject } from '@/customer/value-object/address';
import { CreateCustomerUseCase } from '@/useCase/customer/create/create.customer.usecase';

const customer = new CustomerEntity({ id: '123', name: 'abc' });
const address = new AddressValueObject({ city: 'city', number: 123, street: '12313123', zip: '21132' });
customer.changeAddress(address);

const mockREpository = (): CustomerAggregateRepositoryInterface => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

// é teste de unidade
describe('test find customer use case', () => {
  it('should a find a customer', async () => {
    const customerRepository = mockREpository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: 'Jack',
      address: {
        city: 'city',
        number: 123,
        street: '12313123',
        zip: '21132',
      },
    };

    const outputExpected = {
      id: expect.any(String),
      name: input.name,
      address: {
        city: input.address.city,
        number: input.address.number,
        street: input.address.street,
        zip: input.address.zip,
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(outputExpected);
  });

  it('should rejects with error', async () => {
    const customerRepository = mockREpository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: '',
      address: {
        city: 'city',
        number: 123,
        street: '12313123',
        zip: '21132',
      },
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('name is invalid');
  });
});
