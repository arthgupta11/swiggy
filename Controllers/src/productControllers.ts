// ProductsController.ts
import { Products } from 'Db/src';
import { IProduct } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';

export class ProductsController {
  getProducts = async (): Promise<IProduct[] | IErrorResponse> => {
    try {
      const products: IProduct[] = await Products.findAll({
        where: {
          isDeleted: false,
        },
      });
      return products;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllProducts = async (): Promise<IProduct[] | IErrorResponse> => {
    try {
      const products: IProduct[] = await Products.findAll();
      return products;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addProduct = async (
    _: unknown,
    {
      id,
      name,
      description,
      price,
      restrauntId,
    }: {
      id: number;
      name: string;
      description: string;
      price: JSON;
      restrauntId: number;
    }
  ): Promise<IProduct | IErrorResponse> => {
    try {
      const response = await Products.create({
        id: id,
        name: name,
        description: description,
        price: price,
        restrauntId: restrauntId,
      });

      return response.get({ plain: true }) as IProduct;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteProduct = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await Products.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
      return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateProduct = async (
    _: unknown,
    args: {
      id: number;
      name?: string;
      description?: string;
      price?: JSON;
      restrauntId?: number;
    }
  ): Promise<string> => {
    try {
      const updateData: Partial<IProduct> = {};

      // Dynamically populate updateData with only provided fields
      if (args.name) updateData.name = args.name;
      if (args.description) updateData.description = args.description;
      if (args.price) updateData.price = args.price;
      if (args.restrauntId) updateData.restrauntId = args.restrauntId;
      updateData.modifiedAt = new Date(); // Always update modifiedAt

      const [affectedRows] = await Products.update(updateData, {
        where: { id: args.id },
        returning: true,
      });

      if (affectedRows === 0) {
        return 'No product found with the provided ID';
      }
      return 'product updated successfully';
    } catch (error) {
      console.error('Error updating product:', error);
      return 'Server error';
    }
  };
}
