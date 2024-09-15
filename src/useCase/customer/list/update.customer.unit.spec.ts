import { CustomerFactory } from '@/customer/factory/customer.factory';
import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { AddressValueObject } from '@/customer/value-object/address';
import { ListCustomerUseCase } from '@/useCase/customer/list/update.customer.usecase';
const customer1 = CustomerFactory.createWithAddress(
  'Aloy',
  new AddressValueObject({
    city: 'city',
    number: 456,
    street: 'street',
    zip: 'zip',
  }),
);

const customer2 = CustomerFactory.createWithAddress(
  'Sem nome',
  new AddressValueObject({
    city: 'city',
    number: 789,
    street: 'street',
    zip: 'zip',
  }),
);

const mockREpository = (): CustomerAggregateRepositoryInterface => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('test list customer use case', () => {
  it('should a list a customer', async () => {
    const customerRepository = mockREpository();
    const useCase = new ListCustomerUseCase(customerRepository);

    const result = await useCase.execute({});

    expect(result.customers.length).toBe(2);
    expect(result.customers).toStrictEqual([
      {
        id: customer1.id,
        name: customer1.name,
        address: {
          city: customer1.address!.city,
          number: customer1.address!.number,
          street: customer1.address!.street,
          zip: customer1.address!.zip,
        },
      },
      {
        id: customer2.id,
        name: customer2.name,
        address: {
          city: customer2.address!.city,
          number: customer2.address!.number,
          street: customer2.address!.street,
          zip: customer2.address!.zip,
        },
      },
    ]);
  });
});
