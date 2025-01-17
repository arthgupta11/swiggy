// categoriesController.ts
import { Categories } from 'Db/src';
import { ICategory } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';

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
      id,
      name,
      description,
      restrauntId,
    }: { id: number; name: string; description: string; restrauntId: number }
  ): Promise<ICategory | IErrorResponse> => {
    try {
      const response = await Categories.create({
        id,
        name,
        description,
        restrauntId,
      });
      return response.get({ plain: true }) as ICategory;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteCategory = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await Categories.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
      return 'Item deleted succcessfully';
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
