// categoriesController.ts
import { Categories, ProductCategories, sequelize, Subcategories  } from 'Db/src';
import { ICategory } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
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
    }: {  name: string; description: string; restrauntId: number }
  ): Promise<ICategory | IErrorResponse> => {
    try {
      const data = {
        id:await getMaxId(Categories),
        name: name,
        description: description,
        restrauntId: restrauntId,
      }
       const validationResponse = ValidateSchema.validate(data)
            if (validationResponse.error){
              console.log(validationResponse.error)
              return sendClientError('Incorrect datav validation failed')
            }else{
                 console.log(validationResponse)
                 const response = await Categories.create(data);
                 return response.get({ plain: true }) as ICategory;
            }
     
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteCategory = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    const t = await sequelize.transaction()
    try {
      await Categories.update(
             { isDeleted: true, deletedAt: new Date() },
             { where: { id: id }, transaction: t}
           );
     
      
       await Subcategories.update(
             { isDeleted: true, deletedAt: new Date() },
             { where: { category_id: id }, transaction: t}
       )
     
            // Commit transaction
         await t.commit();
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
