// ProductSubcategoriesController.ts
import { ProductSubcategories } from 'Db/src';
import { IProductSubcategory } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema.Responses';
import { sendClientError, sendServerError } from './_helpers/sendError';
import { getMaxId } from './_helpers/getMaxId';

export class ProductSubcategoriesController {
  getProductSubcategories = async (): Promise<
    IProductSubcategory[] | IErrorResponse
  > => {
    try {
      const productSubcategories: IProductSubcategory[] =
        await ProductSubcategories.findAll({
          where: {
            isDeleted: false,
          },
        });
      return productSubcategories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllProductSubcategories = async (): Promise<
    IProductSubcategory[] | IErrorResponse
  > => {
    try {
      const productSubcategories: IProductSubcategory[] =
        await ProductSubcategories.findAll();
      return productSubcategories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addProductSubcategory = async (
    _: unknown,
    {
      productId,
      subcategoryId,
      restrauntId,
    }: {
      productId: number;
      subcategoryId: number;
      restrauntId: number;
    }
  ): Promise<IProductSubcategory | IErrorResponse> => {
    try {
      const data = {
        id: await getMaxId(ProductSubcategories),
        productId: productId,
        subcategoryId: subcategoryId,
        restrauntId: restrauntId,
      };

      const response = await ProductSubcategories.create(data);

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
      if(response[1]){
            return 'Item deleted succcessfully';
        }else{
            return sendClientError('item with given id not found')
        }
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateProductSubcategory = async (
    _: unknown,
    args: {
      id: number;
      productId: number;
      subcategoryId: number;
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
