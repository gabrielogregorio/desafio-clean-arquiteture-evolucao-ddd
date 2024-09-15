import { EventHandlerInterface } from '../../../@shared/events/event.handler.interface';
import { EventInterface } from '../../../@shared/events/event.interface';
import { AddressValueObject } from '../../value-object/address';

type dataEvent = {
  name: string;
  id: string;
  address: AddressValueObject;
};

export class SendCustomerAddressChangedEventHandler implements EventHandlerInterface {
  handle(event: EventInterface<dataEvent>): void {
    console.log(
      `Handler: EnviaConsoleLogHandler. Mensagem: "Endereço do cliente: id=${event.eventData.id}, name=${event.eventData.name} alterado para: ${JSON.stringify(event.eventData.address)}".`,
    );
  }
}
