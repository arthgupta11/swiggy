import { gql } from 'apollo-server';

export const SubcategoryTypeDefs = gql`
  type Subcategory {
    id: Int
    name: String
    description: String
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
    categoryId: Int
    restrauntId: Int
  }
  type Query {
    getSubcategories: [Subcategory]
    getAllSubcategories: [Subcategory]
  }
  type Mutation {
    addSubcategory(
      name: String
      description: String
      categoryId: Int
      restrauntId: Int
    ): Subcategory
    softDeleteSubcategory(id: Int): String
    hardDeleteSubcategory(id: Int): String
    DeleteSubcategory(id: Int): String
    updateSubcategory(
      id: Int!
      name: String
      description: String
      categoryId: Int
      restrauntId: Int
    ): String
  }
`;
