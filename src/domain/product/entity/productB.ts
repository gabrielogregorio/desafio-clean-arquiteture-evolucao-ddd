import { ProductInterface } from '@/product/entity/product.interface';

export class ProductBEntity implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor({ id, name, price }: { id: string; name: string; price: number }) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get price() {
    return this._price * 2; // tem essa regra difernte
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
  validate() {
    if (!this._id.trim()) {
      throw new Error('id is required');
    }

    if (!this._name.trim()) {
      throw new Error('name is required');
    }
    if (this._price < 0) {
      throw new Error('Price must be greater than zero');
    }
  }
}
