import { SendEmailWhenProductIsCreatedHandler } from '../../product/event/handlers/SendEmailWhenProductIsCreatedHandler.handler';
import { ProductCreatedEvent } from '../../product/event/product.create.event';
import { EventDispatcher } from './event.dispatcher';

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']?.length).toBe(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']?.[0]).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventHandler2 = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.register('ProductCreatedEvent', eventHandler2);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']?.[0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']?.[1]).toMatchObject(eventHandler2);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']?.[0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']?.[1]).toBeUndefined();
  });

  it('should unregister all event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']?.length).toBe(1);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']?.length).toBeUndefined();
  });

  it('should notify event handlers', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product1',
      description: 'example',
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
    expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);
  });
});
