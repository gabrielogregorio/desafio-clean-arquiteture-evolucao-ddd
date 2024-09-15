
// DTO não precisa de conhecer o value object

export interface InputCreateCustomerDto {
  name: string;
  address: {
    // não é para ter o value object
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

// NAO IREMOS RETORNAR A ENTITY
// ELES MUDAM POR RAZOES DIFENETS, NAO REAPROVEITAR INTERFACES
export interface OutputCreateCustomerDto {
  id: string
  name: string;
  address: {
    // não é para ter o value object
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}