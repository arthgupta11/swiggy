// categoriesController.ts
import {
  Categories,
  ProductCategories,
  Restraunts,
  sequelize,
  Subcategories,
} from 'Db/src';
import { ICategory } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema.Responses';
import { sendClientError, sendServerError } from './_helpers/sendError';
import { getMaxId } from './_helpers/getMaxId';
import { ValidateSchema } from './_helpers/validator';

export class CategoriesController {
  getCategories = async (): Promise<ICategory[] | IErrorResponse> => {
    try {
      const categories: ICategory[] = await Categories.findAll({
        where: {
          isDeleted: false,
        },
      });
      return categories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllCategories = async (): Promise<ICategory[] | IErrorResponse> => {
    try {
      const categories: ICategory[] = await Categories.findAll();
      return categories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addCategory = async (
    _: unknown,
    {
      name,
      description,
      restrauntId,
    }: { name: string; description: string; restrauntId: number }
  ): Promise<ICategory | IErrorResponse> => {
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

      const data = {
        id: await getMaxId(Categories),
        name: name,
        description: description,
        restrauntId: restrauntId,
      };
      const validationResponse = ValidateSchema.validate(data);
      if (validationResponse.error) {
        console.log(validationResponse.error);
        return sendClientError('Incorrect datav validation failed');
      } else {
        console.log(validationResponse);
        const response = await Categories.create(data);
        return response.get({ plain: true }) as ICategory;
      }
    } catch (error) {
      return sendServerError(error);
    }
  };

  hardDeleteCategory = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    const t = await sequelize.transaction();

    try {
      await Categories.destroy({
        where: { id: id },
        force: true,
        transaction: t,
      });

      // Commit transaction
      await t.commit();

      
      return `category of id -> ${id} deleted succcessfully`;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteCategory = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    const t = await sequelize.transaction();
    try {
     const response =  await Categories.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, transaction: t }
      );

      await Subcategories.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { category_id: id }, transaction: t }
      );

      // Commit transaction
      await t.commit();
      if(response[0]){
        return 'Item deleted succcessfully';
      }else{
        return sendClientError('item with given id not found')
      }
      // console.log("resp of transaction obj ->",t)
      // return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateCategory = async (
    _: unknown,
    { id, name }: { id: number; name: string }
  ): Promise<String> => {
    try {
      const [affectedRows, updatedCategories] = await Categories.update(
        { name: name, modifiedAt: new Date() }, // Data to be updated
        { where: { id: id }, returning: true } // Condition and return updated rows
      );

      // Return the updated record
      return 'category updated successfully'; // Return the first updated row (as an object)
    } catch (error) {
      return 'server error';
    }
  };
}
