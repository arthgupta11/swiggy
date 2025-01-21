// AddonsController.ts
import { Addons, ProductAddons, Restraunts, sequelize } from 'Db/src';
import { IAddon } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendClientError, sendServerError } from './_helpers/sendError';
import { getMaxId } from './_helpers/getMaxId';
import { ValidateSchema } from './_helpers/validator';
import { transformPriceArray } from './_helpers/transFormData';

export class AddonsController {
  getAddons = async (): Promise<IAddon[] | IErrorResponse> => {
    try {
      const addons: IAddon[] = await Addons.findAll({
        where: {
          isDeleted: false,
        },
      });
      return addons;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  getAllAddons = async (): Promise<IAddon[] | IErrorResponse> => {
    try {
      const addons: IAddon[] = await Addons.findAll();
      return addons;
    } catch (error: unknown) {
      return sendServerError(error);
    }
  };

  addAddon = async (
    _: unknown,
    {
    
      name,
      description,
      price,
      restrauntId,
    }: {
     
      name: string;
      description: string;
      //price: [{'priceKey':string, 'priceValue': number}];
      price: any;
      restrauntId: number;
    }
  ): Promise<IAddon | IErrorResponse> => {
    try {

       const restaurant = await Restraunts.findOne({
              where: {
                id: restrauntId,
                isDeleted: false,  // Only allow active restaurants
              },
            });
            
            if (!restaurant) {
              sendClientError('Cannot add category to a deleted or non-existent restaurant');
            }

      let data =  {
        id:await getMaxId(Addons),
        name: name,
        description: description,
        price: price,
        restrauntId: restrauntId,
      }
       const validationResponse = ValidateSchema.validate(data)
            if (validationResponse.error){
              console.log(validationResponse.error)
              return sendClientError('Incorrect datav validation failed')
            }else{
                 console.log(validationResponse)
                 data = {
                                 ...data,  // Spread all existing properties
                                 price: transformPriceArray(price)  // Update only the price field
                               };
                 const response = await Addons.create(data);
                 return response.get({ plain: true }) as IAddon;
            }
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteAddon= async (_: unknown,{id}:{id: number}
  ): Promise<String | IErrorResponse> =>{
    try {
      const response = await Addons.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
      return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  }

  hardDeleteAddon = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    const t = await sequelize.transaction()

    try {
      await Addons.destroy(
        { where: { id: id },force : true }
      );
      await ProductAddons.destroy(
        { where: { addon_id: id },force : true }
      )
      await t.commit();
     
      return 'Item deleted succcessfully';
    } catch (error) {
      return sendServerError(error);
    }
  };

  updateAddon = async (
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
      const updateData: Partial<IAddon> = {};

      // Dynamically populate updateData with only provided fields
      if (args.name) updateData.name = args.name;
      if (args.description) updateData.description = args.description;
      if (args.price) updateData.price = args.price;
      if (args.restrauntId) updateData.restrauntId = args.restrauntId;
      updateData.modifiedAt = new Date(); // Always update modifiedAt

      const [affectedRows] = await Addons.update(updateData, {
        where: { id: args.id },
        returning: true,
      });

      if (affectedRows === 0) {
        return 'No addon found with the provided ID';
      }
      return 'addon updated successfully';
    } catch (error) {
      console.error('Error updating addon:', error);
      return 'Server error';
    }
  };
}
