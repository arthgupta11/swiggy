// AddonsController.ts
import { Addons } from 'Db/src';
import { IAddon } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';

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
  ): Promise<IAddon | IErrorResponse> => {
    try {
      const response = await Addons.create({
        id: id,
        name: name,
        description: description,
        price: price,
        restrauntId: restrauntId,
      });

      return response.get({ plain: true }) as IAddon;
    } catch (error) {
      return sendServerError(error);
    }
  };

  softDeleteAddon = async (
    _: unknown,
    { id }: { id: number }
  ): Promise<String | IErrorResponse> => {
    try {
      const response = await Addons.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id: id }, returning: true }
      );
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
