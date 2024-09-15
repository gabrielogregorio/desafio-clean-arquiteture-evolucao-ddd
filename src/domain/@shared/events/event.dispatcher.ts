import { EventDispatcherInterface } from './event-dispatcher.interface';
import { EventHandlerInterface } from './event.handler.interface';
import { EventInterface } from './event.interface';

type EventHandlers = { [eventName: string]: EventHandlerInterface[] };

export type EventHandlerName = 'ProductCreatedEvent' | 'CustomerCreatedEvent' | 'CustomerChangedAddressEvent';

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: EventHandlers = {};

  get getEventHandlers(): EventHandlers {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    const listeners = this.eventHandlers[event.name];
    listeners?.forEach((listener) => {
      listener.handle(event);
    });
  }

  register(eventName: EventHandlerName, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: EventHandlerName, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      throw new Error('Event name not exists');
    }

    this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
      (eventHandlerLocal) => eventHandlerLocal !== eventHandler,
    );
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
