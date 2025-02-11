// ProductsController.ts
import {
  ProductAddons,
  ProductCategories,
  ProductRecommendedProducts,
  Products,
  ProductSubcategories,
  Restraunts,
  sequelize,
} from 'Db/src';
import { IProduct } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema.Responses';
import { sendClientError, sendServerError } from './_helpers/sendError';
import { getMaxId } from './_helpers/getMaxId';
import { ValidateSchema } from './_helpers/validator';
import { containsDuplicate } from './_helpers/containsDuplicates';
import { transformPriceArray } from './_helpers/transFormData';

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
      name,
      description,
      price,
      restrauntId,
    }: {
      id: number;
      name: string;
      description: string;
      // price: [{'priceKey':string, 'priceValue': number}];
      price: any;
      restrauntId: number;
    }
  ): Promise<IProduct | IErrorResponse> => {
    try {
      const restaurant = await Restraunts.findOne({
        where: {
          id: restrauntId,
          isDeleted: false, // Only allow active restaurants
        },
      });

      if (!restaurant) {
        sendClientError(
          'Cannot add category to a deleted or non-existent restaurant'
        );
      }
      if (containsDuplicate(price) == false) {
        let data = {
          id: await getMaxId(Products),
          name: name,
          description: description,
          price: price,
          restrauntId: restrauntId,
        };
        console.log(data);
        const validationResponse = ValidateSchema.validate(data);
        if (validationResponse.error) {
          console.log(validationResponse.error);
          return sendClientError('Incorrect data validation failed');
        } else {
          console.log(validationResponse);
          data = {
            ...data, // Spread all existing properties
            price: transformPriceArray(price), // Update only the price field
          };
          const response = await Products.create(data);
          return response.get({ plain: true }) as IProduct;
        }
      } else {
        return sendClientError('duplicate price data not allowed');
      }
    } catch (error) {
      return sendServerError(error);
    }
  };

  hardDeleteProduct = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    const t = await sequelize.transaction();

    try {
      await Products.destroy({
        where: { id: id },
        force: true,
        transaction: t,
      });

      await ProductRecommendedProducts.destroy({
        where: { recommended_productid: id },
        force: true,
        transaction: t,
      });

      const tables = [
        ProductCategories,
        ProductSubcategories,
        ProductAddons,
        ProductRecommendedProducts,
      ];
      await Promise.all(
        tables.map((model: any) =>
          model.destroy({
            where: { product_id: id },
            force: true,
            transaction: t,
          })
        )
      );

      // Commit transaction
      await t.commit();
      return `Product and its mapping of id -> ${id} deleted succcessfully`;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteProduct = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    const t = await sequelize.transaction();

    try {
     const response = await Products.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, transaction: t }
      );

      await ProductRecommendedProducts.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { recommended_productid: id }, transaction: t }
      );
      // List of tables to update
      const tables = [
        ProductCategories,
        ProductSubcategories,
        ProductAddons,
        ProductRecommendedProducts,
      ];

      // Execute updates in parallel using Promise.all
      await Promise.all(
        tables.map((model: any) =>
          model.update(
            { isDeleted: true, deletedAt: new Date() },
            { where: { product_id: id }, transaction: t }
          )
        )
      );

      // Commit transaction
      await t.commit();

      if(response[0]){
        return 'Item deleted succcessfully';
      }else{
        return sendClientError('item with given id not found')
      }
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
