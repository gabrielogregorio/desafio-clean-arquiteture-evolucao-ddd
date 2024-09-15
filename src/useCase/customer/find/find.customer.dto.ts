export interface InputFindCustomerDto {
  id: string
}

// NAO IREMOS RETORNAR A ENTITY
export interface OutputFIndCustomerDto {
  id: string
  name: string
  address: {
    street: string
    city: string
    number:number
    zip: string
  }
}