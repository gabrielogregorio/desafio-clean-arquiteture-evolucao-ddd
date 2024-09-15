import { AddressValueObject } from '@/customer/value-object/address';

export class CustomerEntity {
  private _id: string; // entities devem ter ids
  private _name: string;
  private _address?: AddressValueObject;
  private _active: boolean;
  private _rewardsPoints: number = 0;

  constructor({ id, name }: { id: string; name: string }) {
    this._id = id;
    this._name = name;
    this._active = false;
    this.validate();
  }

  isActive() {
    return this._active;
  }

  validate() {
    if (!this._name.trim()) {
      throw new Error('name is invalid');
    }

    if (!this._id.trim()) {
      throw new Error('id is invalid');
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
    return this._id;
  }
  activate() {
    if (!this._address) {
      throw new Error('to activate needs address');
    }

    this._active = true;
  }

  get id(): string {
    return this._id;
  }

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
