import { BaseInterface } from './baseInterface';

export interface IAddon extends BaseInterface {
  name: string;
  description: string;
  price: JSON; // we need to make it to object
  restrauntId: number;
}
