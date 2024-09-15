import OrderItemEntity from './orderItem';

export default class OrderEntity {
  private _id: string; // entities devem ter ids

  // como ta em agregados diferentes, relaciona por id
  private _customerId: string; // order só existe para cliente, vai ter apenas o id

  // se esta no mesmo agregado, relaciona pela classe
  private _items: OrderItemEntity[]; // items depende da order

  // private _total: number;

  constructor({ customerId, id, items }: { id: string; customerId: string; items: OrderItemEntity[] }) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    // this._total = this.total();

    this.validate();
  }

  addItem(item: OrderItemEntity) {
    this._items.push(item);
    // this._total = this.total();

    this.validate();
  }

  get items() {
    return this._items;
  }

  get customerId() {
    return this._customerId;
  }

  get id(): string {
    return this._id;
  }

  validate() {
    if (!this._id.trim()) {
      throw new Error('id is required');
    }

    if (!this._customerId.trim()) {
      throw new Error('customerId is required');
    }

    if (this._items.length === 0) {
      throw new Error('Items are required');
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error('qtd needs greater zero');
    }

    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
