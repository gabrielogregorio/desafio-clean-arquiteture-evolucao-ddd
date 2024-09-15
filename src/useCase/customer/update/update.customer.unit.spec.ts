import { CustomerEntity } from '@/customer/entity/customer';
import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { AddressValueObject } from '@/customer/value-object/address';
import { UpdateCustomerUseCase } from '@/useCase/customer/update/update.customer.usecase';

const customer = new CustomerEntity({ id: '123', name: 'abc' });

const input = {
  id: customer.id,
  name: 'Jack',
  address: {
    city: 'city',
    number: 123,
    street: '12313123',
    zip: '21132',
  },
};

const address = new AddressValueObject({ city: 'city', number: 123, street: '12313123', zip: '21132' });
customer.changeAddress(address);

const mockREpository = (): CustomerAggregateRepositoryInterface => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

// é teste de unidade
describe('test find customer use case', () => {
  it('should a find a customer', async () => {
    const customerRepository = mockREpository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual(input);
  });

  it('should rejects with error', async () => {
    const customerRepository = mockREpository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const input2 = {
      id: customer.id,
      name: '',
      address: {
        city: 'city',
        number: 123,
        street: '12313123',
        zip: '21132',
      },
    };

    expect(() => {
      return useCase.execute(input2);
    }).rejects.toThrow('name is invalid');
  });

  it('should rejects with error customer not found', async () => {
    const customerRepository = mockREpository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    // @ts-ignore
    customerRepository.find.mockImplementation(() => Promise.resolve(undefined));

    const input2 = {
      id: customer.id,
      name: '',
      address: {
        city: 'city',
        number: 123,
        street: '12313123',
        zip: '21132',
      },
    };

    expect(() => {
      return useCase.execute(input2);
    }).rejects.toThrow('Customer not found');
  });
});
