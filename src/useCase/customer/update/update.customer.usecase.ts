import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { AddressValueObject } from '@/customer/value-object/address';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from '@/useCase/customer/update/update.customer.dto';

export class UpdateCustomerUseCase {
  private customerRepository: CustomerAggregateRepositoryInterface;
  constructor(customerRepository: CustomerAggregateRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);
    if (!customer || !customer.address) {
      throw new Error('Customer not found');
    }

    customer.changeName(input.name);
    customer.changeAddress(
      new AddressValueObject({
        city: input.address.city,
        number: input.address.number,
        street: input.address.street,
        zip: input.address.zip,
      }),
    );

    await this.customerRepository.update(customer);

    // retornar o objeto puro
    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zip: customer.address.zip,
      },
    };
  }
}
