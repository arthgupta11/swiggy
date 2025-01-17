// ProductCategoriesController.ts
import { ProductCategories } from 'Db/src';
import { IProductCategory } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';

export class ProductCategoriesController {
  getProductCategories = async (): Promise<IProductCategory[] | IErrorResponse> => {
    try {
      const productCategories: IProductCategory[] = await ProductCategories.findAll({
        where: {
          isDeleted: false,
        },
      });
      return productCategories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllProductCategories = async (): Promise<IProductCategory[] | IErrorResponse> => {
    try {
      const productCategories: IProductCategory[] = await ProductCategories.findAll();
      return productCategories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addProductCategory = async (
    _: unknown,
    {
      id,
      productId,
      categoryId,
      restrauntId,
    }: {
      id: number;
      productId: number,
      categoryId: number,
      restrauntId: number;
    }
  ): Promise<IProductCategory | IErrorResponse> => {
    console.log(productId)
    try {
      const response = await ProductCategories.create({
        id: id,
        productId: productId,
        categoryId: categoryId,
        restrauntId: restrauntId,
      });

      return response.get({ plain: true }) as IProductCategory;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteProductCategory = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await ProductCategories.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
      return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateProductCategory = async (
    _: unknown,
    args: {
      id: number;
      productId: number,
      categoryId: number,
      restrauntId?: number;
    }
  ): Promise<string> => {
    try {
      const updateData: Partial<IProductCategory> = {};

      // Dynamically populate updateData with only provided fields
      if (args.productId) updateData.productId = args.productId;
      if (args.categoryId) updateData.categoryId = args.categoryId;
      if (args.restrauntId) updateData.restrauntId = args.restrauntId;
      updateData.modifiedAt = new Date(); // Always update modifiedAt

      const [affectedRows] = await ProductCategories.update(updateData, {
        where: { id: args.id },
        returning: true,
      });

      if (affectedRows === 0) {
        return 'No product category found with the provided ID';
      }
      return 'product category mapping updated successfully';
    } catch (error) {
      console.error('Error updating product:', error);
      return 'Server error';
    }
  };
}
