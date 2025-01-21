import { TDataInput, TProduct, TRestrauntData } from './interface';

const attachAddons = (product: TProduct, data: TDataInput): TProduct => {
  product.addons = data.ProductAddons.filter(pa => pa.productId === product.id)
    .map(pa => data.Addons.find(a => a.id === pa.addonId)!)
    .filter(addon => addon);
  return product;
};

const attachRecommendedProducts = (product: TProduct, data: TDataInput): TProduct => {
  product.recommendedproducts = data.ProductRecommendedProducts.filter(pr => pr.productId === product.id)
    .map(pr => data.Products.find(p => p.id === pr.recommendedProductId)!)
    .filter(recommended => recommended);
  return product;
};

const transformSubcategories = (categoryId: number, data: TDataInput) => {
  return data.Subcategories.filter(subcategory => subcategory.categoryId === categoryId)
    .map(subcategory => {
      const products = data.ProductSubcategories.filter(ps => ps.subcategoryId === subcategory.id)
        .map(ps => {
          const product = data.Products.find(p => p.id === ps.productId);
          if (product) {
            const productWithAddons = attachAddons(product, data);
            const productWithRecommendations = attachRecommendedProducts(productWithAddons, data);
            return productWithRecommendations;
          }
          return null;
        })
        .filter(product => product !== null);
      return { ...subcategory, products };
    });
};

export const transformData = (data: TDataInput): TRestrauntData => {
  const result: TRestrauntData = {
    id: data.id,
    name: data.name,
    Categories: data.Categories.map(category => {
      const subcategories = transformSubcategories(category.id, data);
      return { ...category, Subcategories: subcategories };
    }),
    Products: data.Products.map(product => {
      const productWithAddons = attachAddons(product, data);
      const productWithRecommendations = attachRecommendedProducts(productWithAddons, data);
      return productWithRecommendations;
    }),
  };

  return result;
};


interface Price {
  priceKey: string;
  priceValue: number;
}

export const transformPriceArray = (prices: Price[]): Record<string, number> => {
  return prices.reduce((accumulator, item) => {
    accumulator[item.priceKey] = item.priceValue; // Add key-value pair to the result object
    return accumulator;
  }, {} as Record<string, number>);
};
