// Poruqe não tem injeção aqui???
// Porque esse repository é sim acoplado ao orm, ele é sim dependente, e não estamos preocupados com
// desacoplamento, ele é feito para conversar mesmo com o orm/banco de forma acoplada mesmo
// é intencional isso
// essa classe implementa a interface e fala com o banco acoplado mesmo.

import { ProductEntity } from '@/product/entity/product';
import { ProductModel } from './product.mode';
import { ProductAggregateRepositoryInterface } from '@/product/repository/product-agregate-repository';
import { ProductInterface } from '@/product/entity/product.interface';

export class ProductInfraRepository implements ProductAggregateRepositoryInterface {
  async create(entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async find(id: string): Promise<ProductInterface | undefined> {
    const product = await ProductModel.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return undefined;
    }

    return new ProductEntity({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async findAll(): Promise<ProductInterface[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) =>
        new ProductEntity({
          id: product.id,
          name: product.name,
          price: product.price,
        }),
    );
  }

  async update(entity: ProductInterface): Promise<void> {
    await ProductModel.update(
      { name: entity.name, price: entity.price },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }
}
