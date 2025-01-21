// subcategoriesController.ts
import { Categories, ProductSubcategories, Restraunts, Subcategories, sequelize } from 'Db/src';
import { ISubcategory } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendClientError, sendServerError } from './_helpers/sendError';
import { getMaxId } from './_helpers/getMaxId';
import { ValidateSchema } from './_helpers/validator';

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
      
      name,
      description,
      categoryId,
      restrauntId,
    }: {
      
      name: string;
      description: string;
      categoryId: number;
      restrauntId: number;
    }
  ): Promise<ISubcategory | IErrorResponse> => {
    try {
       const restaurant = await Restraunts.findOne({
              where: {
                id: restrauntId,
                isDeleted: false,  // Only allow active restaurants
              },
         });
        const category = await Categories.findOne({
          where: {
            category_id: categoryId,
            isDeleted: false,  // Only allow active restaurants
          },
         });
          if (!restaurant || !category) {
              sendClientError('Cannot add category to a deleted or non-existent restaurant');
         }
         
      const data = {
        id: await getMaxId(Subcategories),
        name: name,
        description: description,
        categoryId: categoryId,
        restrauntId: restrauntId,
      }
       const validationResponse = ValidateSchema.validate(data)
            if (validationResponse.error){
              console.log(validationResponse.error)
              return sendClientError('Incorrect datav validation failed')
            }else{
                 console.log(validationResponse)
                 const response = await Subcategories.create(data);
                 return response.get({ plain: true }) as ISubcategory;
            }
      
    } catch (error) {
      return sendServerError(error);
    }
  };
hardDeleteSubcategory = async ( _: unknown, {id}: {id: number}):Promise<String | IErrorResponse> =>{
    const t = await sequelize.transaction()

    try {
     
      await Subcategories.destroy(
        { where: { id: id },
        force: true,
        transaction: t }
      );
    
      await ProductSubcategories.destroy(
        { where: { id: id },
        force: true,
        transaction: t }
      );
      
   
    // Commit transaction
    await t.commit();
      return `Subcategory and its mapping  of id -> ${id} deleted succcessfully`;
    } catch (error) {
      return sendServerError(error);
    }
  }
  softDeleteSubcategory = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    const t = await sequelize.transaction()
    try {

      await Subcategories.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, transaction: t}
      );

      await ProductSubcategories.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { subcategory_id: id }, transaction: t}
      )

       // Commit transaction
    await t.commit();
      return `subcategory of id ----> ${id} deleted succcessfully`;
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
