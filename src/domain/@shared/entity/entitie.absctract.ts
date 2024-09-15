import { Notification } from '@/shared/notification/notification';

export abstract class Entity {
  // @ts-ignore
  protected _id: string;
  protected notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}
