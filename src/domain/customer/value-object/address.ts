/// ele é responsável por se auto validar

export class AddressValueObject {
  _street: string = '';
  _number: number = 0;
  _zip: string = '';
  _city: string = '';

  constructor({ number, city, street, zip }: { street: string; number: number; zip: string; city: string }) {
    this._city = city;
    this._number = number;
    this._zip = zip;
    this._street = street;

    this.validate();
  }

  get city() {
    return this._city;
  }

  get zip() {
    return this._zip;
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  private validate() {
    if (!this._street.trim()) {
      throw new Error('street is not empty');
    }

    if (!this._zip.trim()) {
      throw new Error('zip is not empty');
    }

    if (!this._city.trim()) {
      throw new Error('city is not empty');
    }

    if (this._number === 0) {
      throw new Error('number is not empty');
    }
  }
}
