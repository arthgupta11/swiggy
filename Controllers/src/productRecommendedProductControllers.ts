// ProductRecommendedProductsController.ts
import { ProductRecommendedProducts } from 'Db/src';
import { IProductReccommendedProduct } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';
import { getMaxId } from './_helpers/getMaxId';

export class ProductRecommendedProductsController {
  getProductRecommendedProducts = async (): Promise<
    IProductReccommendedProduct[] | IErrorResponse
  > => {
    try {
      const productProductRecommendedProducts: IProductReccommendedProduct[] =
        await ProductRecommendedProducts.findAll({
          where: {
            isDeleted: false,
          },
        });
      return productProductRecommendedProducts;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllProductRecommendedProducts = async (): Promise<
    IProductReccommendedProduct[] | IErrorResponse
  > => {
    try {
      const productProductRecommendedProducts: IProductReccommendedProduct[] =
        await ProductRecommendedProducts.findAll();
      return productProductRecommendedProducts;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addProductRecommendedProduct = async (
    _: unknown,
    {
      
      productId,
      recommendedProductId,
      restrauntId,
    }: {
    
      productId: number;
      recommendedProductId: number;
      restrauntId: number;
    }
  ): Promise<IProductReccommendedProduct | IErrorResponse> => {
    console.log(productId);
    try {
      const data = {
        id: await getMaxId(ProductRecommendedProducts),
        productId: productId,
        recommendedProductId: recommendedProductId,
        restrauntId: restrauntId,
      }
      const response = await ProductRecommendedProducts.create(data);

      return response.get({ plain: true }) as IProductReccommendedProduct;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteProductRecommendedProduct = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await ProductRecommendedProducts.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
      return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateProductRecommendedProduct = async (
    _: unknown,
    args: {
      id: number;
      productId: number;
      recommendedProductId: number;
      restrauntId?: number;
    }
  ): Promise<string> => {
    try {
      const updateData: Partial<IProductReccommendedProduct> = {};

      // Dynamically populate updateData with only provided fields
      if (args.productId) updateData.productId = args.productId;
      if (args.recommendedProductId)
        updateData.recommendedProductId = args.recommendedProductId;
      if (args.restrauntId) updateData.restrauntId = args.restrauntId;
      updateData.modifiedAt = new Date(); // Always update modifiedAt

      const [affectedRows] = await ProductRecommendedProducts.update(
        updateData,
        {
          where: { id: args.id },
          returning: true,
        }
      );

      if (affectedRows === 0) {
        return 'No product recommendedProduct found with the provided ID';
      }
      return 'product recommendedProduct mapping updated successfully';
    } catch (error) {
      console.error('Error updating product:', error);
      return 'Server error';
    }
  };
}
