import { ProductInterface } from '@/product/entity/product.interface';
import { Entity } from '@/shared/entity/entitie.absctract';
import { NotificationError } from '@/shared/notification/notification.error';

export class ProductEntity extends Entity implements ProductInterface {
  // private _id: string;
  private _name: string;
  private _price: number;

  constructor({ id, name, price }: { id: string; name: string; price: number }) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get name() {
    return this._name;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get price() {
    return this._price;
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
  validate() {
    if (!this.id.trim()) {
      this.notification.addError({
        context: 'product',
        message: 'id is required',
      });
    }

    if (!this._name.trim()) {
      this.notification.addError({
        context: 'product',
        message: 'name is required',
      });
    }

    if (this._price < 0) {
      this.notification.addError({
        context: 'product',
        message: 'Price must be greater than zero',
      });
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
