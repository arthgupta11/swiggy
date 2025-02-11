import { BaseInterface } from './baseInterface';

export interface IProductReccommendedProduct extends BaseInterface {
  productId: number;
  recommendedProductId: number;
  restrauntId: number;
}
