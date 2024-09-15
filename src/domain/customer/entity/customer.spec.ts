import { AddressValueObject } from '../value-object/address';
import { CustomerEntity } from './customer';

describe('', () => {
  it('should error when id is empty', () => {
    expect(() => {
      new CustomerEntity({ id: '', name: 'name' });
    }).toThrow('customer: id is invalid');
  });

  it('should error when name is empty', () => {
    expect(() => {
      new CustomerEntity({ id: '123', name: '' });
    }).toThrow('customer: name is invalid');
  });

  it('should error list when name and id is empty', () => {
    expect(() => {
      new CustomerEntity({ id: '', name: '' });
    }).toThrow('customer: id is invalid, customer: name is invalid');
  });

  it('should update name client', () => {
    let customer = new CustomerEntity({ id: '123', name: 'maria' }); //arrange

    customer.changeName('example'); // act

    expect(customer.name).toBe('example'); // assert
  });

  it('should thrown error when address is empty', () => {
    let customer = new CustomerEntity({ id: '123', name: 'maria' }); //arrange

    expect(() => {
      customer.activate(); // act
    }).toThrow('to activate needs address');
  });

  it('should activate customer', () => {
    let customer = new CustomerEntity({ id: '123', name: 'maria' }); //arrange
    const address = new AddressValueObject({ street: 'sp', number: 10, zip: '123', city: 'aru' });

    customer.changeAddress(address); // act
    customer.activate(); // act

    expect(customer.isActive()).toBeTruthy(); // assert
  });

  it('should deactivate customer', () => {
    let customer = new CustomerEntity({ id: '123', name: 'maria' }); //arrange

    customer.deactivate(); // act

    expect(customer.isActive()).toBeFalsy(); // assert
  });

  it('should add reward', () => {
    let customer = new CustomerEntity({ id: '123', name: 'maria' }); //arrange
    expect(customer.rewardsPoints).toEqual(0);

    customer.addRewardsPoints(15); // act

    expect(customer.rewardsPoints).toEqual(15); // assert

    customer.addRewardsPoints(10); // act

    expect(customer.rewardsPoints).toEqual(25); // assert
  });
});
