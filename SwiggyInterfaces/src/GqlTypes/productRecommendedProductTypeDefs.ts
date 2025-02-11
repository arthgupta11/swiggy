import { gql } from 'apollo-server';

export const ProductRecommendedProductTypeDefs = gql`
  type ProductRecommendedProduct {
    id: Int
    productId: Int
    recommendedProductId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
    getRecommendedProducts: [ProductRecommendedProduct]
    getAllRecommendedProducts: [ProductRecommendedProduct]
  }
  type Mutation {
    addRecommendedProduct(
      productId: Int
      recommendedProductId: Int
      restrauntId: Int
    ): ProductRecommendedProduct
    softDeleteRecommendedProduct(id: Int): String

    updateRecommendedProduct(
      id: Int!
      productId: Int
      recommendedProduct: Int
      restrauntId: Int
    ): String
  }
`;
