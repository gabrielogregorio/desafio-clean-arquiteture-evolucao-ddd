export interface RepositoryInterface<T> {
  // é muito raro retornar o proprio T, é muito custoso isso
  // você já tem o produto, não precisa de um novo
  // no geral, podemos usar o void
  //create(entity: T): Promise<T>

  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T | undefined>; //T será os nossos adregados

  // evans recomenda retornar um count, para vocÊ saber a quantidade de items
  findAll(): Promise<T[]>; //T será os nossos adregados
}
