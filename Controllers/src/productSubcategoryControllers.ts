// ProductSubcategoriesController.ts
import { ProductSubcategories } from 'Db/src';
import { IProductSubcategory } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';

export class ProductSubcategoriesController {
  getProductSubcategories = async (): Promise<IProductSubcategory[] | IErrorResponse> => {
    try {
      const productSubcategories: IProductSubcategory[] = await ProductSubcategories.findAll({
        where: {
          isDeleted: false,
        },
      });
      return productSubcategories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };
  

  getAllProductSubcategories = async (): Promise<IProductSubcategory[] | IErrorResponse> => {
    try {
      const productSubcategories: IProductSubcategory[] = await ProductSubcategories.findAll();
      return productSubcategories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addProductSubcategory = async (
    _: unknown,
    {
      id,
      productId,
      subcategoryId,
      restrauntId,
    }: {
      id: number;
      productId: number,
      subcategoryId: number,
      restrauntId: number;
    }
  ): Promise<IProductSubcategory | IErrorResponse> => {
    console.log(id)
    try {
      const response = await ProductSubcategories.create({
        id: id,
        productId: productId,
        subcategoryId: subcategoryId,
        restrauntId: restrauntId,
      });

      return response.get({ plain: true }) as IProductSubcategory;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteProductSubcategory = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await ProductSubcategories.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
      return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateProductSubcategory = async (
    _: unknown,
    args: {
      id: number;
      productId: number,
      subcategoryId: number,
      restrauntId?: number;
    }
  ): Promise<string> => {
    try {
      const updateData: Partial<IProductSubcategory> = {};

      // Dynamically populate updateData with only provided fields
      if (args.productId) updateData.productId = args.productId;
      if (args.subcategoryId) updateData.subcategoryId = args.subcategoryId;
      if (args.restrauntId) updateData.restrauntId = args.restrauntId;
      updateData.modifiedAt = new Date(); // Always update modifiedAt

      const [affectedRows] = await ProductSubcategories.update(updateData, {
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
  