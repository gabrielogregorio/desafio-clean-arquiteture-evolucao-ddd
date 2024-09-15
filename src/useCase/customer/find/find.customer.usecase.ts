import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { InputFindCustomerDto, OutputFIndCustomerDto } from 'src/useCase/customer/find/find.customer.dto';

export class FindCustomerUseCase {
  private customerRepository: CustomerAggregateRepositoryInterface;
  constructor(customerRepository: CustomerAggregateRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFIndCustomerDto> {
    const customer = await this.customerRepository.find(input.id);
    if (!customer || !customer.address) {
      throw new Error('');
    }

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
