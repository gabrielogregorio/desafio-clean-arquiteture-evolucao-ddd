import { app, sequelize } from '@/infrastructure/api/express';
import request from 'supertest';

describe('ProductE2e', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const input = {
        name: 'Celular',
        price: 150,
      };

      const response = await request(app).post('/product').send(input);

      const outputExpected = {
        ...input,
        id: expect.any(String),
      };

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(outputExpected);
    });

    it('should thrown a error on create product with invalid payload', async () => {
      const input = {
        name: 'computador',
      };

      const response = await request(app).post('/product').send(input);

      expect(response.status).toEqual(500);
      expect(response.body).toEqual({
        message: 'internal server error',
      });
    });
  });

  describe('list', () => {
    it('should list items', async () => {
      const product1 = {
        name: 's24',
        price: 10,
      };

      const product2 = {
        name: 's6edge',
        price: 20,
      };

      await request(app).post('/product').send(product1);
      await request(app).post('/product').send(product2);

      const response = await request(app).get('/product').send();

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        products: [
          {
            name: 's24',
            price: 10,
            id: expect.any(String),
          },
          {
            name: 's6edge',
            price: 20,
            id: expect.any(String),
          },
        ],
      });
    });
  });
});
