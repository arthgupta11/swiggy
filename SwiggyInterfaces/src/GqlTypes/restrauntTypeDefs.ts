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

    type Category {
    id: Int!
    name: String!
    description: String
    createdAt: String
    modifiedAt: String
    restrauntId: Int
    deletedAt: String
    isDeleted: Boolean!
  }

  type Subcategory {
    id: Int!
    name: String!
    description: String
    createdAt: String
    modifiedAt: String
    categoryId: Int
    restrauntId: Int
    deletedAt: String
    isDeleted: Boolean!
  }

  type Product {
    id: Int!
    name: String!
    description: String
    price: JSON
    createdAt: String
    modifiedAt: String
    restrauntId: Int
    deletedAt: String
    isDeleted: Boolean!
  }

  type Addon {
    id: Int!
    name: String!
    price: JSON
    createdAt: String
    modifiedAt: String
    restrauntId: Int
    deletedAt: String
    isDeleted: Boolean!
  }

  

  type ProductSubcategory {
    id: Int
    productId: Int
    subcategoryId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }

   type ProductRecommendedProduct {
    id: Int
    productId: Int
    recommendedProductId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }

   type ProductCategory {
    id: Int!
    productId: Int
    categoryId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }


  type ProductAddon {
    id: Int
    productId: Int
    addonId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }

  type RestrauntData {
    id: Int!
    name: String!
    Categories: [Category]
    Subcategories: [Subcategory]
    Products: [Product]
    Addons: [Addon]
    ProductSubcategories:[ProductSubcategory]
    ProductCategories: [ProductCategory]
    ProductRecommendedProducts: [ProductRecommendedProduct]
    ProductAddons: [ProductAddon]

  }

  type NestedRestrauntData {
  id: Int!
  name: String!
  Categories: [NestedCategory]
  Products: [NestedProduct]
}

type NestedCategory {
  id: Int!
  name: String!
  description: String
  createdAt: String
  modifiedAt: String
  restrauntId: Int
  deletedAt: String
  isDeleted: Boolean!
  Subcategories: [NestedSubcategory]
}

type NestedSubcategory {
  id: Int!
  name: String!
  description: String
  createdAt: String
  modifiedAt: String
  categoryId: Int
  restrauntId: Int
  deletedAt: String
  isDeleted: Boolean!
  products: [NestedProduct]
}

type NestedProduct {
  id: Int!
  name: String!
  description: String
  price: JSON
  createdAt: String
  modifiedAt: String
  restrauntId: Int
  deletedAt: String
  isDeleted: Boolean!
  addons: [Addon]
  recommendedproducts: [NestedProduct]
}


type SqlFilteredData {
  id: Int!
  name: String!
  createdAt: String
  modifiedAt: String
  deletedAt: String
  isDeleted: Boolean!
  categories: [FilteredCategory]
  products: [FilteredProduct]
  addons: [Addon]
  productCategories: [ProductCategory]
  productSubcategories: [ProductSubcategory]
  productAddons: [ProductAddon]
  productRecommendedProducts: [ProductRecommendedProduct]
}

type FilteredCategory {
  id: Int!
  name: String!
  description: String
  createdAt: String
  modifiedAt: String
  restrauntId: Int
  deletedAt: String
  isDeleted: Boolean!
  subcategories: [FilteredSubcategory]
}

type FilteredSubcategory {
  id: Int!
  name: String!
  description: String
  createdAt: String
  modifiedAt: String
  categoryId: Int
  restrauntId: Int
  deletedAt: String
  isDeleted: Boolean!
  products: [FilteredProduct]
}

type FilteredProduct {
  id: Int!
  name: String!
  description: String
  price: JSON
  createdAt: String
  modifiedAt: String
  restrauntId: Int
  deletedAt: String
  isDeleted: Boolean!
  addons: [Addon]
  recommendedProducts: [FilteredProduct]
} 
  type ErrorRes{
  status: Int
  error: String
  message: String
  }
 
  
  

  type Query {
   getSqlFilteredData(id: Int): SqlFilteredData
   getAllNestedData(id : Int): NestedRestrauntData
   getRestraunts: [Restraunt]
   getAllRestraunts : [Restraunt]
   getAllData(id: Int): RestrauntData
   }

   type Mutation{
     addRestraunt( name: String): Restraunt
     softDeleteRestraunt( id: Int): String   
     updateRestraunt(id: Int, name: String): String
   }
`;

// in deletion add for error