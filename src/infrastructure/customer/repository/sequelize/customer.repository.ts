import { CustomerEntity } from '@/customer/entity/customer';
import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { AddressValueObject } from '@/customer/value-object/address';
import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model';

export class CustomerInfraRepository implements CustomerAggregateRepositoryInterface {
  async create(entity: CustomerEntity): Promise<void> {
    const address = entity.address
      ? {
          street: entity.address.street,
          city: entity.address.city,
          number: entity.address.number,
          zip: entity.address.zip,
        }
      : {};

    await CustomerModel.create({
      id: entity.id,
      active: entity.isActive(),
      name: entity.name,
      rewardsPoints: entity.rewardsPoints,
      ...address,
    });
  }

  async update(entity: CustomerEntity): Promise<void> {
    const address = entity.address
      ? {
          street: entity.address.street,
          city: entity.address.city,
          number: entity.address.number,
          zip: entity.address.zip,
        }
      : {};

    await CustomerModel.update(
      {
        id: entity.id,
        active: entity.isActive(),
        name: entity.name,
        rewardsPoints: entity.rewardsPoints,
        ...address,
      },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }

  async find(id: string): Promise<CustomerEntity | undefined> {
    let customer: CustomerModel;

    try {
      customer = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: false,
      });
    } catch (error) {
      console.log(error);
      // tem algo errado aqui
      throw new Error(`customer not found - id: "${id}"`);
    }

    if (!customer) {
      throw new Error('Error');
    }

    const customerEntity = new CustomerEntity({
      id: customer.id,
      name: customer.name,
    });

    if (customer.zip) {
      customerEntity.changeAddress(
        new AddressValueObject({
          city: customer.city,
          number: customer.number,
          street: customer.street,
          zip: customer.zip,
        }),
      );
    }

    if (customer.active) {
      customerEntity.activate();
    }

    if (customer.rewardsPoints) {
      customerEntity.addRewardsPoints(customer.rewardsPoints);
    }

    return customerEntity;
  }

  async findAll(): Promise<CustomerEntity[]> {
    const Customers = await CustomerModel.findAll();
    return Customers.map((customer) => {
      const customerEntity = new CustomerEntity({
        id: customer.id,
        name: customer.name,
      });

      if (customer.zip) {
        customerEntity.changeAddress(
          new AddressValueObject({
            city: customer.city,
            number: customer.number,
            street: customer.street,
            zip: customer.zip,
          }),
        );
      }

      return customerEntity;
    });
  }
}
