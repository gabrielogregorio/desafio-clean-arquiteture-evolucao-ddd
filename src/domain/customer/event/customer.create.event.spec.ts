import { EventDispatcher } from '../../@shared/events/event.dispatcher';
import { CustomerEntity } from '../entity/customer';
import { AddressValueObject } from '../value-object/address';
import { CustomerCreatedEvent } from './customer.create.event';
import { CustomerChangedAddressEvent } from './CustomerChangedAddressEvent';
import { SendCustomerAddressChangedEventHandler } from './handlers/SendCustomerAddressChangedEventHandler';
import { SendCustomerLog1CreatedHandler } from './handlers/SendCustomerLog1CreatedHandler';
import { SendCustomerLog2CreatedHandler } from './handlers/SendCustomerLog2CreatedHandler';

describe('Domain events tests', () => {
  it('should notify on create user', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new SendCustomerLog1CreatedHandler();
    const eventHandler2 = new SendCustomerLog2CreatedHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']?.length).toBe(2);

    const customer = new CustomerEntity({ id: '123', name: 'maria' });

    expect(spyEventHandler1).toHaveBeenCalledTimes(0);
    expect(spyEventHandler2).toHaveBeenCalledTimes(0);

    const customerEventCreated = new CustomerCreatedEvent(customer);
    eventDispatcher.notify(customerEventCreated);

    expect(spyEventHandler1).toHaveBeenCalledWith(customerEventCreated);
    expect(spyEventHandler2).toHaveBeenCalledWith(customerEventCreated);
  });

  it('should notify on change address', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new SendCustomerAddressChangedEventHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');

    eventDispatcher.register('CustomerChangedAddressEvent', eventHandler1);

    expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent']?.length).toBe(1);

    const customer = new CustomerEntity({ id: '123', name: 'maria' });
    customer.changeAddress(
      new AddressValueObject({
        city: 'city',
        number: 123,
        street: 'street',
        zip: 'zip',
      }),
    );

    expect(spyEventHandler1).toHaveBeenCalledTimes(0);

    const customerEventCreated = new CustomerChangedAddressEvent(customer);
    eventDispatcher.notify(customerEventCreated);

    expect(spyEventHandler1).toHaveBeenCalledWith(customerEventCreated);
  });
});
