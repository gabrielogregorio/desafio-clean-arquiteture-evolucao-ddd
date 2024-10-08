import { app, sequelize } from '@/infrastructure/api/express';
import request from 'supertest';

describe('E2e test for to customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const input = {
        name: 'Jone',
        address: {
          street: 'street',
          number: 123,
          city: 'city',
          zip: 'zip',
        },
      };

      const outputExpected = {
        ...input,
        id: expect.any(String),
      };

      const response = await request(app).post('/customer').send(input);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(outputExpected);
    });

    it('should thrown a error', async () => {
      const input = {
        name: 'Jone',
      };

      const response = await request(app).post('/customer').send(input);

      expect(response.status).toEqual(500);
      expect(response.body).toEqual({
        message: 'internal server error',
      });
    });
  });

  describe('list', () => {
    it('should list items', async () => {
      const user1 = {
        name: 'Jone',
        address: {
          street: 'street',
          number: 123,
          city: 'city',
          zip: 'zip',
        },
      };

      const user2 = {
        name: 'listen',
        address: {
          street: 'street',
          number: 123,
          city: 'city',
          zip: 'zip',
        },
      };

      await request(app).post('/customer').send(user1);
      await request(app).post('/customer').send(user2);

      const response = await request(app).get('/customer').send();

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        customers: [
          {
            name: 'Jone',
            address: {
              street: 'street',
              number: 123,
              city: 'city',
              zip: 'zip',
            },
            id: expect.any(String),
          },
          {
            name: 'listen',
            address: {
              street: 'street',
              number: 123,
              city: 'city',
              zip: 'zip',
            },
            id: expect.any(String),
          },
        ],
      });

      const responseXml = await request(app).get('/customer').set('Accept', 'application/xml').send();

      expect(responseXml.status).toEqual(200);
      expect(responseXml.text).toMatch(
        new RegExp(`<\\?xml version="1.0" encoding="UTF-8"\\?>
<customers>
\\s*<customer>
\\s*<id>.{10,}</id>
\\s*<name>Jone</name>
\\s*<address>
\\s*<city>city</city>
\\s*<number>123</number>
\\s*<street>street</street>
\\s*<zip>zip</zip>
\\s*</address>
\\s*<id>.{10,}</id>
\\s*<name>listen</name>
\\s*<address>
\\s*<city>city</city>
\\s*<number>123</number>
\\s*<street>street</street>
\\s*<zip>zip</zip>
\\s*</address>
\\s*</customer>
</customers>`),
      );
    });
  });
});
