import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'customers',
  timestamps: false,
})
export class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  // Falando em dominio, endereço é objeto de valor
  // mas falando de banco, ele nãoi quer nem saber
  // de dominio e nem nada disso. é outro mundo, não é dominio
  // uma coisa é dominio e outra é banco, modelagem, ambos não precisam saber de como
  // é feito no vizinho

  // NAO PODEMOS MODELAR O DOMINIO PENSANDO NO BANCO, ISSO É CRIME
  // O INVERSO PODE!
  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: number;

  @Column({ allowNull: false })
  declare zip: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @Column({ allowNull: false })
  declare rewardsPoints: number;
}
