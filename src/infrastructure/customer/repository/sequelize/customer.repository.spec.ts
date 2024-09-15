import { Sequelize } from 'sequelize-typescript';
import { CustomerInfraRepository } from './customer.repository';
import { CustomerModel } from './customer.model';
import { AddressValueObject } from '@/customer/value-object/address';
import { CustomerEntity } from '@/customer/entity/customer';

describe('Customer repository test', () => {
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

  it('should create a Customer', async () => {
    const customerRepository = new CustomerInfraRepository();
    const customer = new CustomerEntity({ id: '1', name: 'name example' });
    const address = new AddressValueObject({
      city: 'city',
      number: 10,
      street: 'street',
      zip: '1234',
    });

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      number: customer.address?.number,
      city: customer.address?.city,
      rewardsPoints: customer.rewardsPoints,
      street: customer.address?.street,
      zip: customer.address?.zip,
    });
  });

  it('should update Customer', async () => {
    const CustomerRepository = new CustomerInfraRepository();

    const customer = new CustomerEntity({ id: '2', name: 'name example' });
    const address = new AddressValueObject({
      city: 'city',
      number: 10,
      street: 'street',
      zip: '1234',
    });

    customer.changeAddress(address);

    CustomerRepository.create(customer);

    const addressUpdated = new AddressValueObject({
      city: 'city',
      number: 10,
      street: 'street',
      zip: '1234',
    });
    customer.changeAddress(addressUpdated);

    customer.changeName('new name');
    customer.changeAddress(addressUpdated);

    CustomerRepository.update(customer);

    const CustomerDb = await CustomerModel.findOne({
      where: {
        id: '2',
      },
    });

    expect(CustomerDb?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      rewardsPoints: customer.rewardsPoints,
      active: customer.isActive(),
      zip: customer.address?.zip,
      number: customer.address?.number,
      street: customer.address?.street,
      city: customer.address?.city,
    });
  });

  it('should throws error or not found customer', async () => {
    const customerRepository = new CustomerInfraRepository();

    expect(async () => {
      await customerRepository.find('fake-id');
    }).rejects.toThrow('customer not found - id: "fake-id"');
  });

  it('should a find Customer', async () => {
    const customerRepository = new CustomerInfraRepository();

    const customer = new CustomerEntity({
      id: 'abc',
      name: 'name',
    });

    const address = new AddressValueObject({
      city: 'city',
      number: 10,
      street: 'street',
      zip: '1234',
    });

    customer.changeAddress(address);

    customer.activate();

    customer.addRewardsPoints(10);
    customer.addRewardsPoints(20);

    await customerRepository.create(customer);

    const customerDb = await customerRepository.find(customer.id);

    expect(customerDb).toEqual(customer);
  });

  it('should find a many Customers', async () => {
    const repository = new CustomerInfraRepository();

    const customer1 = new CustomerEntity({
      id: '1',
      name: 'p1',
    });

    const customer2 = new CustomerEntity({
      id: '2',
      name: 'p2',
    });

    const address = new AddressValueObject({
      city: 'city',
      number: 10,
      street: 'street',
      zip: '1234',
    });

    customer1.changeAddress(address);
    customer2.changeAddress(address);

    repository.create(customer1);
    repository.create(customer2);

    const Customers = await repository.findAll();

    expect(Customers).toEqual([customer1, customer2]);
  });
});
