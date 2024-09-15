import OrderEntity from '@/checkout/entity/order';
import OrderItemEntity from '@/checkout/entity/orderItem';
import { CustomerEntity } from '@/customer/entity/customer';
import { AddressValueObject } from '@/customer/value-object/address';
import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model';
import { CustomerInfraRepository } from '@/infrastructure/customer/repository/sequelize/customer.repository';
import { OrderItemModel } from '@/infrastructure/order/repository/sequelize/order-item.model';
import { OrderModel } from '@/infrastructure/order/repository/sequelize/order.model';
import { OrderInfraRepository } from '@/infrastructure/order/repository/sequelize/order.repository';
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.mode';
import { ProductInfraRepository } from '@/infrastructure/product/repository/sequelize/product.repository';
import { ProductEntity } from '@/product/entity/product';
import { Sequelize } from 'sequelize-typescript';

const customerRepository = new CustomerInfraRepository();
const customer = new CustomerEntity({ id: '123', name: 'customer1' });
const address = new AddressValueObject({ city: 'city', number: 10, street: 'street', zip: 'zip' });
const orderRepository = new OrderInfraRepository();
const product = new ProductEntity({ id: '12', name: 'product', price: 1 });
const productRepository = new ProductInfraRepository();
customer.changeAddress(address);

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',

      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    await customerRepository.create(customer);
    await productRepository.create(product);

    const orderItem = new OrderItemEntity({
      id: '123',
      name: product.name,
      productId: product.id,
      price: product.price,
      quantity: 1,
    });

    const orderItem2 = new OrderItemEntity({
      id: '678',
      name: product.name,
      productId: product.id,
      price: product.price,
      quantity: 1,
    });

    const order = new OrderEntity({
      customerId: customer.id,
      id: '123',
      items: [orderItem, orderItem2],
    });

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(JSON.parse(JSON.stringify(orderModel))).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          order_id: order.id,
          price: orderItem2.price,
          product_id: orderItem2.productId,
          quantity: orderItem2.quantity,
        },
      ],
    });
  });

  it('should find a order created', async () => {
    await customerRepository.create(customer);
    const product = new ProductEntity({ id: '12', name: 'product', price: 1 });
    const productRepository = new ProductInfraRepository();
    await productRepository.create(product);

    const orderItem = new OrderItemEntity({
      id: '123',
      name: product.name,
      productId: product.id,
      price: product.price,
      quantity: 1,
    });

    const order = new OrderEntity({
      customerId: customer.id,
      id: '123',
      items: [orderItem],
    });

    const orderInfraRepository = new OrderInfraRepository();
    await orderInfraRepository.create(order);

    const itemFounded = await orderInfraRepository.find(order.id);

    expect(itemFounded).toEqual(order);
  });

  it('should update a order', async () => {
    await customerRepository.create(customer);

    await productRepository.create(product);

    const orderItem = new OrderItemEntity({
      id: '123',
      name: product.name,
      productId: product.id,
      price: product.price,
      quantity: 1,
    });

    const order = new OrderEntity({
      customerId: customer.id,
      id: '456',
      items: [orderItem],
    });
    await orderRepository.create(order);

    const newProduct = new ProductEntity({
      id: '778899',
      name: 'example',
      price: 5,
    });
    await productRepository.create(newProduct);

    const orderItem2 = new OrderItemEntity({
      id: '456',
      name: newProduct.name,
      productId: newProduct.id,
      price: newProduct.price,
      quantity: 1,
    });

    order.addItem(orderItem2);

    await orderRepository.update(order);

    const data = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(JSON.parse(JSON.stringify(data))).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          product_id: orderItem2.productId,
          quantity: orderItem2.quantity,
          order_id: order.id,
        },
      ],
    });
  });

  it('should returns all orders a order', async () => {
    await customerRepository.create(customer);

    await productRepository.create(product);

    const orderItem = new OrderItemEntity({
      id: '123',
      name: product.name,
      productId: product.id,
      price: product.price,
      quantity: 1,
    });

    const order = new OrderEntity({
      customerId: customer.id,
      id: '456',
      items: [orderItem],
    });
    await orderRepository.create(order);

    const newProduct = new ProductEntity({
      id: '778899',
      name: 'example',
      price: 5,
    });
    await productRepository.create(newProduct);

    const orderItem2 = new OrderItemEntity({
      id: '456',
      name: newProduct.name,
      productId: newProduct.id,
      price: newProduct.price,
      quantity: 1,
    });

    const order2 = new OrderEntity({
      customerId: customer.id,
      id: '789',
      items: [orderItem2],
    });

    await orderRepository.create(order2);

    expect(await orderRepository.findAll()).toEqual([order, order2]);
  });
});
