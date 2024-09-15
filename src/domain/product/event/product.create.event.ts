import { EventHandlerName } from '../../@shared/events/event.dispatcher';
import { EventInterface } from '../../@shared/events/event.interface';

type dataType = {
  name: string;
  description: string;
  price: number;
};

export class ProductCreatedEvent implements EventInterface<dataType> {
  dataTimeOcurred: Date;
  eventData: dataType;
  name: EventHandlerName = 'ProductCreatedEvent';

  constructor(eventData: dataType) {
    this.dataTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
