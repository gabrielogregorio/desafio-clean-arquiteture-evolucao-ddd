import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from '@/useCase/customer/create/create.customer.dto';
import { CustomerFactory } from '@/customer/factory/customer.factory';
import { AddressValueObject } from '@/customer/value-object/address';

export class CreateCustomerUseCase {
  private customerRepository: CustomerAggregateRepositoryInterface;
  constructor(customerRepository: CustomerAggregateRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const address = new AddressValueObject({
      city: input.address.city,
      number: input.address.number,
      street: input.address.street,
      zip: input.address.zip,
    });
    const customer = CustomerFactory.createWithAddress(input.name, address);

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address!.city,
        number: customer.address!.number,
        street: customer.address!.street,
        zip: customer.address!.zip,
      },
    };
  }
}
