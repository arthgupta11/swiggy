interface TProduct {
  id: number;
  name: string;
  description: string;
  price: Record<string, number>;
  createdAt: string;
  modifiedAt: string;
  restrauntId: number;
  deletedAt: string | null;
  isDeleted: boolean;
  addons?: TAddon[];
  recommendedproducts?: TProduct[];
}

interface TAddon {
  id: number;
  name: string;
  description: string;
  price: Record<string, number>;
  createdAt: string;
  modifiedAt: string;
  restrauntId: number;
  deletedAt: string | null;
  isDeleted: boolean;
}

interface TSubcategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  modifiedAt: string;
  categoryId: number;
  restrauntId: number;
  deletedAt: string | null;
  isDeleted: boolean;
  products: TProduct[];
}

interface TCategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  modifiedAt: string;
  restrauntId: number;
  deletedAt: string | null;
  isDeleted: boolean;
  Subcategories: TSubcategory[];
}

interface TRestrauntData {
  id: number;
  name: string;
  Categories: TCategory[];
  Products: TProduct[];
}

interface TDataInput {
  id: number;
  name: string;
  Categories: TCategory[];
  Subcategories: TSubcategory[];
  Products: TProduct[];
  ProductSubcategories: { productId: number; subcategoryId: number }[];
  ProductCategories: { productId: number; categoryId: number }[];
  ProductAddons: { productId: number; addonId: number }[];
  ProductRecommendedProducts: {
    productId: number;
    recommendedProductId: number;
  }[];
  Addons: TAddon[];
}

export {
  TAddon,
  TCategory,
  TDataInput,
  TProduct,
  TRestrauntData,
  TSubcategory,
};
