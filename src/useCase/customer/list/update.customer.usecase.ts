import { CustomerEntity } from '@/customer/entity/customer';
import { CustomerAggregateRepositoryInterface } from '@/customer/repository/customer-repository.interface';
import { InputListCustomerDto, OutputListCustomerDto } from '@/useCase/customer/list/update.customer.dto';

class OutputMapper {
  static toOutput(customers: CustomerEntity[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => {
        return {
          id: customer.id,
          name: customer.name,
          address: {
            city: customer!.address!.city,
            number: customer!.address!.number,
            street: customer!.address!.street,
            zip: customer!.address!.zip,
          },
        };
      }),
    };
  }
}

export class ListCustomerUseCase {
  private customerRepository: CustomerAggregateRepositoryInterface;
  constructor(customerRepository: CustomerAggregateRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(_input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers);
  }
}
