import { CustomerEntity } from '@/customer/entity/customer';
import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { AddressValueObject } from '@/customer/value-object/address';
import { FindCustomerUseCase } from '@/useCase/customer/find/find.customer.usecase';

const customer = new CustomerEntity({ id: '123', name: 'abc' });
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
    const useCase = new FindCustomerUseCase(customerRepository);

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

  it('should not found', () => {
    const customerRepository = mockREpository();
    // @ts-ignore
    customerRepository.find.mockImplementation(() => {
      throw new Error('customer not found');
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('customer not found');
  });
});
