import { OutputListCustomerDto } from '@/useCase/customer/list/update.customer.dto';
import { toXML } from 'jstoxml';

export class CustomerPresenter {
  static listXml(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newLine: '\n',
      allowEmpty: true,
    };

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => {
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
          }),
        },
      },
      xmlOptions,
    );
  }
}
