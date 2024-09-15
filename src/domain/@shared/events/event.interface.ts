import { EventHandlerName } from './event.dispatcher';

export interface EventInterface<T = unknown> {
  name: EventHandlerName;
  dataTimeOcurred: Date;
  eventData: T;
}
