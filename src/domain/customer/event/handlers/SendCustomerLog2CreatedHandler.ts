import { EventHandlerInterface } from '../../../@shared/events/event.handler.interface';
import { EventInterface } from '../../../@shared/events/event.interface';

export class SendCustomerLog2CreatedHandler implements EventHandlerInterface {
  handle(_event: EventInterface<unknown>): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}
