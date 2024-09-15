import { EventHandlerName } from '../../@shared/events/event.dispatcher';
import { EventInterface } from '../../@shared/events/event.interface';
import { CustomerEntity } from '../entity/customer';

export class CustomerCreatedEvent implements EventInterface<CustomerEntity> {
  dataTimeOcurred: Date;
  eventData: CustomerEntity;
  name: EventHandlerName = 'CustomerCreatedEvent';

  constructor(data: CustomerEntity) {
    this.dataTimeOcurred = new Date();
    this.eventData = data;
  }
}
