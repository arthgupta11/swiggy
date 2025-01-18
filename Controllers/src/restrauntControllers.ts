// RestrauntsController.ts
import { Addons, Categories, ProductAddons, ProductCategories, ProductRecommendedProducts, Products, ProductSubcategories, Restraunts, sequelize, Subcategories } from 'Db/src';
import { IRestraunt } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';
import { transformData } from './_helpers/transFormData';
import { TDataInput } from './_helpers/interface';


export class RestrauntsController {
  
  nestedFetchAllData = async(_:unknown, {id}:{id: number}): Promise<unknown> =>{
  try{
    console.log("id------>", id)
    Restraunts.hasMany(Categories, { foreignKey: 'restraunt_id' });

    Restraunts.hasMany(ProductCategories, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany( ProductAddons, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany( ProductRecommendedProducts, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany( ProductSubcategories, { foreignKey: 'restraunt_id' });

    Restraunts.hasMany(Subcategories, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany(Products, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany(Addons, { foreignKey: 'restraunt_id' });
    Categories.hasMany(Subcategories, { foreignKey: 'category_id' });
    // Subcategories.hasMany(Products,{foreignKey: ''} )
    Categories.belongsTo(Restraunts, { foreignKey: 'restraunt_id' });
    Subcategories.belongsTo(Categories, {foreignKey: 'category_id'})


    const restraunt = await Restraunts.findOne({
      where: { id: id },
      include: [
        {
          model: Categories ,  
        },
        Subcategories,
        Products,
        Addons,
        ProductCategories,
        ProductSubcategories,
        ProductAddons,
        ProductRecommendedProducts
      ],
    });

     const  data: TDataInput = restraunt?.get({ plain: true });
     const response = transformData(data)

     console.log(response)
     return response

}catch(error){
  sendServerError(error)
}
  }
  fetchAllData = async (_: unknown, {id}:{id: number}): Promise<unknown> =>{
   console.log(id);
   console.log("_________________________")
    try{
    Restraunts.hasMany(Categories, { foreignKey: 'restraunt_id' });

    Restraunts.hasMany(ProductCategories, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany( ProductAddons, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany( ProductRecommendedProducts, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany( ProductSubcategories, { foreignKey: 'restraunt_id' });

    Restraunts.hasMany(Subcategories, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany(Products, { foreignKey: 'restraunt_id' });
    Restraunts.hasMany(Addons, { foreignKey: 'restraunt_id' });
    Categories.hasMany(Subcategories, { foreignKey: 'category_id' });
    // Subcategories.hasMany(Products,{foreignKey: ''} )
    Categories.belongsTo(Restraunts, { foreignKey: 'restraunt_id' });
    Subcategories.belongsTo(Categories, {foreignKey: 'category_id'})

    const restraunt = await Restraunts.findOne({
      where: { id: id },
      include: [
        {
          model: Categories ,  
        },
        Subcategories,
        Products,
        Addons,
        ProductCategories,
        ProductSubcategories,
        ProductAddons,
        ProductRecommendedProducts
      ],
    });

const response = restraunt?.get({ plain: true });
console.log(response)
return response
   }catch(error){
    sendServerError(error)
   }
   
  }
  getRestraunts = async (): Promise<IRestraunt[] | IErrorResponse> => {
    try {
      const restraunts: IRestraunt[] = await Restraunts.findAll({
        where: {
          isDeleted: false,
        },
      });
      return restraunts;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllRestraunts = async (): Promise<IRestraunt[] | IErrorResponse> => {
    try {
      const restraunts: IRestraunt[] = await Restraunts.findAll();
      return restraunts;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addRestraunt = async (
    _: unknown,
    input: IRestraunt
  ): Promise<IRestraunt | IErrorResponse> => {
    try {
      const response = await Restraunts.create({
        id: input.id,
        name: input.name,
      });

      return response.get({ plain: true }) as IRestraunt;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteRestraunt = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await Restraunts.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
      return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateRestraunt = async (
    _: unknown,
    { id, name }: { id: number; name: string }
  ): Promise<String> => {
    try {
      const [affectedRows, updatedRestraunts] = await Restraunts.update(
        { name: name, modifiedAt: new Date() }, // Data to be updated
        { where: { id: id }, returning: true } // Condition and return updated rows
      );

      // Return the updated record
      return 'Restraunt updated successfully'; // Return the first updated row (as an object)
    } catch (error) {
      return 'server error';
    }
  };
}
