import { ISuccessResponse } from '../Responses/successResponseSchema';

export const successResponse = (
  message: string,
  data?: unknown
): ISuccessResponse => {
  return {
    status: 200,
    message,
    data,
  };
};
