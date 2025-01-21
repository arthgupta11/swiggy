// RestrauntsController.ts
import {
  Addons,
  Categories,
  ProductAddons,
  ProductCategories,
  ProductRecommendedProducts,
  Products,
  ProductSubcategories,
  Restraunts,
  sequelize,
  Subcategories,
} from 'Db/src';

import { IRestraunt } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendClientError, sendServerError } from './_helpers/sendError';
import { transformData } from './_helpers/transFormData';
import { TDataInput } from './_helpers/interface';
import { getMaxId } from './_helpers/getMaxId';
import { ValidateSchema } from './_helpers/validator';

export class RestrauntsController {
  getSqlFilteredData = async (_:unknown, {id}: {id: number}
  ): Promise<unknown> => {
      console.log("id-->",id)
       try{
        Restraunts.hasMany(Categories, { foreignKey: 'restraunt_id' });
        Restraunts.hasMany(Subcategories, { foreignKey: 'restraunt_id' });
        Restraunts.hasMany(Products, { foreignKey: 'restraunt_id' });
        Restraunts.hasMany(Addons, { foreignKey: 'restraunt_id' });
        Restraunts.hasMany(ProductCategories, { foreignKey: 'restraunt_id' });
        Restraunts.hasMany(ProductSubcategories, { foreignKey: 'restraunt_id' });
        Restraunts.hasMany(ProductAddons, { foreignKey: 'restraunt_id' });
        Restraunts.hasMany(ProductRecommendedProducts, {foreignKey: 'restraunt_id'});
        
        Categories.hasMany(Subcategories, { foreignKey: 'category_id' });
        
        Categories.belongsToMany(Products, {through: ProductCategories, foreignKey:'category_id', otherKey: 'product_id'})
        Subcategories.belongsToMany(Products, {through: ProductSubcategories  , foreignKey:'subcategory_id', otherKey: 'product_id'} )
        Products.belongsToMany(Addons, {through: ProductAddons, foreignKey:'product_id', otherKey: 'addon_id'})
        Products.belongsToMany(Products, {
          through: ProductRecommendedProducts,
          as: 'relatedProducts',
          foreignKey: 'product_id',
          otherKey: 'recommended_productid'  
        });

   
        
        const restraunts = await Restraunts.findOne({
          where: { id: id },
          include: [
            {
              model: Categories,
              include: [
                {
                   model: Subcategories,
                   include: [
                    {
                      model: Products,
                      include:[
                        {
                          model:Addons
                        },
                        {
                          model: Products,
                          as: 'relatedProducts',
                        }
                      ]
                      
                    }]
                },
                {
                  model:  Products,
                  include:[
                    {
                      model:Addons
                    }
                    
                  ]
                }]
            }
            ,
            Products
           
          ],
        })
        console.log("req data")
        const response = restraunts?.get({ plain: true })
        console.log(JSON.stringify(response.Categories));
        return response
       }catch(error){
        sendServerError(error)
       }
  }



  nestedFetchAllData = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<unknown> => {
    try {
      console.log('id------>', id);
      Restraunts.hasMany(Categories, { foreignKey: 'restraunt_id' });

      Restraunts.hasMany(ProductCategories, { foreignKey: 'restraunt_id' });
      Restraunts.hasMany(ProductAddons, { foreignKey: 'restraunt_id' });
      Restraunts.hasMany(ProductRecommendedProducts, {
        foreignKey: 'restraunt_id',
      });
      Restraunts.hasMany(ProductSubcategories, { foreignKey: 'restraunt_id' });

      Restraunts.hasMany(Subcategories, { foreignKey: 'restraunt_id' });
      Restraunts.hasMany(Products, { foreignKey: 'restraunt_id' });
      Restraunts.hasMany(Addons, { foreignKey: 'restraunt_id' });
      Categories.hasMany(Subcategories, { foreignKey: 'category_id' });
      // Subcategories.hasMany(Products,{foreignKey: ''} )
      Categories.belongsTo(Restraunts, { foreignKey: 'restraunt_id' });
      Subcategories.belongsTo(Categories, { foreignKey: 'category_id' });

      const restraunt = await Restraunts.findOne({
        where: { id: id ,   isDeleted: false
        },
        include: [
          {
            model: Categories,
          },
          Subcategories,
          Products,
          Addons,
          ProductCategories,
          ProductSubcategories,
          ProductAddons,
          ProductRecommendedProducts,
        ],
      });

      const data: TDataInput = restraunt?.get({ plain: true });
      const response = transformData(data);
      console.log('DATAAAA',response.Categories[1].Subcategories[0].products);
      // console.log(JSON.stringify(response));
      return response;
    } catch (error) {
      sendServerError(error);
    }
  };
  fetchAllData = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<unknown> => {
    console.log(id);
    console.log('_________________________');
    try {
      Restraunts.hasMany(Categories, { foreignKey: 'restraunt_id' });

      Restraunts.hasMany(ProductCategories, { foreignKey: 'restraunt_id' });
      Restraunts.hasMany(ProductAddons, { foreignKey: 'restraunt_id' });
      Restraunts.hasMany(ProductRecommendedProducts, {
        foreignKey: 'restraunt_id',
      });
      Restraunts.hasMany(ProductSubcategories, { foreignKey: 'restraunt_id' });

      Restraunts.hasMany(Subcategories, { foreignKey: 'restraunt_id' });
      Restraunts.hasMany(Products, { foreignKey: 'restraunt_id' });
      Restraunts.hasMany(Addons, { foreignKey: 'restraunt_id' });
      Categories.hasMany(Subcategories, { foreignKey: 'category_id' });
      // Subcategories.hasMany(Products,{foreignKey: ''} )
      Categories.belongsTo(Restraunts, { foreignKey: 'restraunt_id' });
      Subcategories.belongsTo(Categories, { foreignKey: 'category_id' });

      const restraunt = await Restraunts.findOne({
        where: { id: id },
        include: [
          {
            model: Categories,
          },
          Subcategories,
          Products,
          Addons,
          ProductCategories,
          ProductSubcategories,
          ProductAddons,
          ProductRecommendedProducts,
        ],
      });

      const response = restraunt?.get({ plain: true });
     
      return response;
    } catch (error) {
      sendServerError(error);
    }
  };
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
    input: Partial<IRestraunt>
  ): Promise<IRestraunt | IErrorResponse> => {
    try {
      const data = {
        id: await getMaxId(Restraunts),
        name: input.name,
      }
      console.log(data)
      const validationResponse = ValidateSchema.validate(data)
      if (validationResponse.error){
        console.log(validationResponse.error)
        return sendClientError('Incorrect datav validation failed')
      }else{
           console.log(validationResponse)
           const response = await Restraunts.create(data);
           return response.get({ plain: true }) as IRestraunt;
      }
      
      
    } catch (error) {
      return sendServerError(error);
    }
  };

  hardDeleteRestraunt = async ( _: unknown, {id}: {id: number}):Promise<String | IErrorResponse> =>{
    const t = await sequelize.transaction()

    try {
     
      await Restraunts.destroy(
        { where: { id: id },
        force: true,
        transaction: t }
      );

      
   
    // Commit transaction
    await t.commit();
      return `Item of id -> ${id} deleted succcessfully`;
    } catch (error) {
      return sendServerError(error);
    }
  }

  softDeleteRestraunt = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {

    const t = await sequelize.transaction()

    try {
     
      await Restraunts.update(
        {  isDeleted: true, deletedAt: new Date()  },
        { where: { id: id }, transaction: t }
      );
       // List of tables to update
    const tables = [Categories, Subcategories, Products, Addons];

    // Execute updates in parallel using Promise.all
    await Promise.all(
      tables.map((model) =>
        model.update(
          {  isDeleted: true, deletedAt: new Date()  },
          { where: { restraunt_id: id }, transaction: t }
        )
      )
    );

    // Commit transaction
    await t.commit();
      return `Item of id -> ${id} deleted succcessfully`;
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
