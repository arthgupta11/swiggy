// RestrauntsController.ts
import { Restraunts, sequelize } from 'Db/src';
import { IRestraunt } from 'SwiggyInterfaces/src';
import { IErrorResponse } from './Responses/errorResponseSchema';
import { sendServerError } from './_helpers/sendError';

export class RestrauntsController {
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
