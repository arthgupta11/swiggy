import { IErrorResponse } from '../Responses/errorResponseSchema.Responses';

import { GraphQLError } from 'graphql';

export const sendClientError = (message: string): never => {
  const error = new GraphQLError(message);
  (error as any).extensions = {
    code: 'BAD_REQUEST',
    status: 400,
  };
  throw error;
};

export const sendServerError = (error: unknown): never => {
  // const error = new GraphQLError(message);
  (error as any).extensions = {
    code: 'Server issue',
    status: 500,
  };
  throw error;
};


// export const sendServerError = (error: unknown): IErrorResponse => {
 
//   console.log('sendServerError ->', error);
//   return {
//     status: 500,
//     error,
//     message: 'Server side error',
//   };
// };

// export const sendClientError = (error: unknown): IErrorResponse => {
//   return {
//     status: 400,
//     error,
//     message: 'Client side error ',
//   };
// };
