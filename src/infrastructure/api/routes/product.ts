import { ProductInfraRepository } from '@/infrastructure/product/repository/sequelize/product.repository';
import { CreateProductUseCase } from '@/useCase/product/create/create.product.usecase';
import { ListProductUseCase } from '@/useCase/product/list/update.product.usecase';
import express, { Request, Response } from 'express';

export const productRouter = express.Router();

productRouter.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductInfraRepository());

  try {
    const output = await useCase.execute({
      price: req.body.price,
      name: req.body.name,
    });

    res.status(200).json(output);
  } catch (error: unknown) {
    res.status(500).json({ message: 'internal server error' });
  }
});

productRouter.get('/', async (_req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductInfraRepository());

  try {
    const output = await useCase.execute({});

    res.status(200).json(output);
  } catch (error: unknown) {
    res.status(500).json({ message: 'internal server error' });
  }
});
