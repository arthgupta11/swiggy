// ProductAddonsController.ts
import { ProductAddons } from 'Db/src';
import { IProductAddon } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema.Responses';
import { sendClientError, sendServerError } from './_helpers/sendError';
import { getMaxId } from './_helpers/getMaxId';

export class ProductAddonsController {
  getProductAddons = async (): Promise<IProductAddon[] | IErrorResponse> => {
    try {
      const productAddons: IProductAddon[] = await ProductAddons.findAll({
        where: {
          isDeleted: false,
        },
      });
      return productAddons;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllProductAddons = async (): Promise<IProductAddon[] | IErrorResponse> => {
    try {
      const productAddons: IProductAddon[] = await ProductAddons.findAll();
      return productAddons;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addProductAddon = async (
    _: unknown,
    {
      productId,
      addonId,
      restrauntId,
    }: {
      productId: number;
      addonId: number;
      restrauntId: number;
    }
  ): Promise<IProductAddon | IErrorResponse> => {
    console.log(productId);
    try {
      const data = {
        id: await getMaxId(ProductAddons),
        productId: productId,
        addonId: addonId,
        restrauntId: restrauntId,
      };
      const response = await ProductAddons.create(data);

      return response.get({ plain: true }) as IProductAddon;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteProductAddon = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await ProductAddons.update(
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

  updateProductAddon = async (
    _: unknown,
    args: {
      id: number;
      productId: number;
      addonId: number;
      restrauntId?: number;
    }
  ): Promise<string> => {
    try {
      const updateData: Partial<IProductAddon> = {};

      // Dynamically populate updateData with only provided fields
      if (args.productId) updateData.productId = args.productId;
      if (args.addonId) updateData.addonId = args.addonId;
      if (args.restrauntId) updateData.restrauntId = args.restrauntId;
      updateData.modifiedAt = new Date(); // Always update modifiedAt

      const [affectedRows] = await ProductAddons.update(updateData, {
        where: { id: args.id },
        returning: true,
      });

      if (affectedRows === 0) {
        return 'No product addon found with the provided ID';
      }
      return 'product addon mapping updated successfully';
    } catch (error) {
      console.error('Error updating product:', error);
      return 'Server error';
    }
  };
}
