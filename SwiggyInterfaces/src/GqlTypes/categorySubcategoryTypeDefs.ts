import { gql } from 'apollo-server';

export const CategorySubcategoryTypeDefs = gql`
 
  type CategorySubcategory {
    id: Int
    categoryId: Int
    subcategoryId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
   getCategorySubcategory: [CategorySubcategory]
   }
`;