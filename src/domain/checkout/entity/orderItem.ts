export default class OrderItemEntity {
  private _id: string;
  private _productId: string;
  private _quantity: number;
  private _name: string;
  private _price: number;

  constructor({
    id,
    name,
    price,
    productId,
    quantity,
  }: {
    id: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
  }

  get productId() {
    return this._productId;
  }
  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  get price(): number {
    return this._price * this._quantity;
  }

  get quantity(): number {
    return this._quantity;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}
