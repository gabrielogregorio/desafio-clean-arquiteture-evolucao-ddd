import { EventHandlerInterface } from '../../../@shared/events/event.handler.interface';
import { ProductCreatedEvent } from '../product.create.event';

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log('sending email to', event);
  }
}
