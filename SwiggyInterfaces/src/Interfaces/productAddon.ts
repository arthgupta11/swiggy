import { BaseInterface } from './baseInterface';

export interface IProductAddon extends BaseInterface {
  productId: number;
  addonId: number;
  restrauntId: number;
}
