import { NotificationErrorProps } from '@/shared/notification/notification';

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors
        .map((error) => `${error.context}: ${error.message}`)
        .join(', ')
        .replace(/,\s*$/, ''),
    );
  }
}
