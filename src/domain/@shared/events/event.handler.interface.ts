import { EventInterface } from './event.interface';

// tem um metodo que recebe um evento
export interface EventHandlerInterface<T extends EventInterface = EventInterface> {
  handle(event: T): void;
}
