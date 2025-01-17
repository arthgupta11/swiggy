// subcategoriesController.ts
import { Subcategories } from 'Db/src';
import { ISubcategory } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';

export class SubcategoriesController {
  getSubcategories = async (): Promise<ISubcategory[] | IErrorResponse> => {
    try {
      const subcategories: ISubcategory[] = await Subcategories.findAll({
        where: {
          isDeleted: false,
        },
      });
      return subcategories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllSubcategories = async (): Promise<ISubcategory[] | IErrorResponse> => {
    try {
      const subcategories: ISubcategory[] = await Subcategories.findAll();
      return subcategories;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addSubcategory = async (
    _: unknown,
    {
      id,
      name,
      description,
      categoryId,
      restrauntId,
    }: {
      id: number;
      name: string;
      description: string;
      categoryId: number;
      restrauntId: number;
    }
  ): Promise<ISubcategory | IErrorResponse> => {
    try {
      const response = await Subcategories.create({
        id: id,
        name: name,
        description: description,
        categoryId: categoryId,
        restrauntId: restrauntId,
      });

      return response.get({ plain: true }) as ISubcategory;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteSubcategory = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await Subcategories.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
      return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateSubcategory = async (
    _: unknown,
    args: {
      id: number;
      name?: string;
      description?: string;
      categoryId?: number;
      restrauntId?: number;
    }
  ): Promise<string> => {
    try {
      const updateData: Partial<ISubcategory> = {};

      // Dynamically populate updateData with only provided fields
      if (args.name) updateData.name = args.name;
      if (args.description) updateData.description = args.description;
      if (args.categoryId) updateData.categoryId = args.categoryId;
      if (args.restrauntId) updateData.restrauntId = args.restrauntId;
      updateData.modifiedAt = new Date(); // Always update modifiedAt

      const [affectedRows] = await Subcategories.update(updateData, {
        where: { id: args.id },
        returning: true,
      });

      if (affectedRows === 0) {
        return 'No subcategory found with the provided ID';
      }
      return 'Subcategory updated successfully';
    } catch (error) {
      console.error('Error updating subcategory:', error);
      return 'Server error';
    }
  };
}
