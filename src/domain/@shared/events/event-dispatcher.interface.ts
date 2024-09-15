// esse cara que notifica, que registra tudo o que acontece

import { EventHandlerInterface } from './event.handler.interface';
import { EventInterface } from './event.interface';

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  // exemplo, user create e a classe, o handler
  register(eventName: string, eventHandler: EventHandlerInterface): void; // para registrar o evento e o handler desse evento
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  unregisterAll(): void;
}
