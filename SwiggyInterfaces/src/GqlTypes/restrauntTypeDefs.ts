import { gql } from 'apollo-server';

export const RestrauntTypeDefs = gql`
  type Restraunt {
    id: Int!
    name: String!
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
   getRestraunts: [Restraunt]
   getAllRestraunts : [Restraunt]
   }

   type Mutation{
     addRestraunt( id: Int, name: String): Restraunt
     softDeleteRestraunt( id: Int): String   
     updateRestraunt(id: Int, name: String): String
   }
`;

// in deletion add for error