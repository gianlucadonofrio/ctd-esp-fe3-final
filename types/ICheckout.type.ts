export type ICheckout = {
  personalData: IPersonalData;
  paymentData: IPaymentData;
  orderData: IOrderData;
};

export interface IPersonalData {
  nombre: string;
  apellido: string;
  email: string;
  direccion: IDireccion;
}
export interface IDireccion {
  calle: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
}

export interface IPaymentData {
  number: string;
  nameOnCard: string;
  expDate: string;
  cvc: string;
}

export interface IOrderData {
  nombre: string;
  cantidad: number;
  total: number;
  imagen: string;
}
