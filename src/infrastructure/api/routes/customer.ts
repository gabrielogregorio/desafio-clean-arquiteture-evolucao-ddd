import { CustomerPresenter } from '@/infrastructure/api/presenter/customer.presenter';
import { CustomerInfraRepository } from '@/infrastructure/customer/repository/sequelize/customer.repository';
import { CreateCustomerUseCase } from '@/useCase/customer/create/create.customer.usecase';
import { ListCustomerUseCase } from '@/useCase/customer/list/update.customer.usecase';
import express, { Request, Response } from 'express';

export const customerRouter = express.Router();

customerRouter.post('/', async (req: Request, res: Response) => {
  // isso abaixo é um controller
  const useCase = new CreateCustomerUseCase(new CustomerInfraRepository());

  try {
    const output = await useCase.execute({
      address: {
        city: req.body.address.city,
        number: req.body.address.number,
        street: req.body.address.street,
        zip: req.body.address.zip,
      },
      name: req.body.name,
    });

    res.status(200).json(output);
  } catch (error: unknown) {
    res.status(500).json({ message: 'internal server error' });
  }
});

customerRouter.get('/', async (_req: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerInfraRepository());

  try {
    const output = await useCase.execute({});

    // estamos partindo do principio que o retorno do dto é igual ao que queremos disponibilizar na api.
    // mas podemos sim ter casos onde isso não se bate...
    // tbm estamos considerando que tudo é um json... e se eu quiser em xml, graphql,

    res
      .format({
        json: async () => res.send(output),
        xml: async () => res.send(CustomerPresenter.listXml(output)),
      })
      .send();

    //status(200).json(output);
  } catch (error: unknown) {
    res.status(500).json({ message: 'internal server error' });
  }
});
