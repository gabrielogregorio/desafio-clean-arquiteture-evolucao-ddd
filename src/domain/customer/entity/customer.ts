import { CustomerValidatorFactory } from '@/customer/factory/customer.validator.validar';
import { AddressValueObject } from '@/customer/value-object/address';
import { Entity } from '@/shared/entity/entitie.absctract';
import { NotificationError } from '@/shared/notification/notification.error';

export class CustomerEntity extends Entity {
  // private _id: string; // entities devem ter ids / vem do entity agora
  private _name: string;
  private _address?: AddressValueObject;
  private _active: boolean;
  private _rewardsPoints: number = 0;

  constructor({ id, name }: { id: string; name: string }) {
    super();
    this._id = id;
    this._name = name;
    this._active = false;
    this.validate();
  }

  isActive() {
    return this._active;
  }

  validate() {
      // agora nosso domain não sabe mais quem é o yup, apenas que alguém valida isso.
    CustomerValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  changeAddress(address: AddressValueObject) {
    this._address = address;
  }

  get address() {
    return this._address;
  }
  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  getId() {
    return this.id;
  }
  activate() {
    if (!this._address) {
      throw new Error('to activate needs address');
    }

    this._active = true;
  }

  // get id(): string {
  //   return this.id;
  // }

  get rewardsPoints(): number {
    return this._rewardsPoints;
  }

  // a gente não seta esses points, e sim soma eles
  addRewardsPoints(points: number) {
    this._rewardsPoints += points;
  }

  deactivate() {
    this._active = false;
  }
}
