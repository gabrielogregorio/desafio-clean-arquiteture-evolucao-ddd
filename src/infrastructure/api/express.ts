import { customerRouter } from '@/infrastructure/api/routes/customer';
import { productRouter } from '@/infrastructure/api/routes/product';
import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model';
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.mode';
import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';

export const app: Express = express();

app.use(express.json());

app.use('/customer', customerRouter);
app.use('/product', productRouter);

export let sequelize: Sequelize;

const setup = async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
};
setup();
