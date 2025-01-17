import { IErrorResponse } from '../Responses/errorResponseSchema';

export const sendServerError = (error: unknown): IErrorResponse => {
  console.log('sendServerError ->', error);
  return {
    status: 500,
    error,
    message: 'Server side error',
  };
};

export const sendClientError = (error: unknown): IErrorResponse => {
  return {
    status: 400,
    error,
    message: 'Client side error ',
  };
};
