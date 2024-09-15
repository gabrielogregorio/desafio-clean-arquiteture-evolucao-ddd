import { Notification } from '@/shared/notification/notification';

describe('', () => {
  it('should create  errors', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.messages('customer')).toBe('customer: error message');

    const error2 = {
      message: 'error message2',
      context: 'customer',
    };
    notification.addError(error2);
    expect(notification.messages('customer')).toBe('customer: error message, customer: error message2');

    const error3 = {
      message: 'error message3',
      context: 'other',
    };
    notification.addError(error3);
    expect(notification.messages('customer')).toBe('customer: error message, customer: error message2');
    expect(notification.messages('other')).toBe('other: error message3');

    expect(notification.messages()).toBe('customer: error message, customer: error message2, other: error message3');
  });

  it('should verify has errors', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBeTruthy();
  });

  it('should get a errors props', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBeTruthy();
  });

  it('should get a errors items', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });
});
