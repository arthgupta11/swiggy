import { TDataInput, TRestrauntData } from './interface';

export const transformData = (data: TDataInput): unknown => {
  console.log(data);
  const result: TRestrauntData = {
    id: data.id,
    name: data.name,
    Categories: data.Categories.map((category) => {
      const subcategories = data.Subcategories.filter(
        (subcategory) => subcategory.categoryId === category.id
      ).map((subcategory) => {
        const products = data.ProductSubcategories.filter(
          (ps) => ps.subcategoryId === subcategory.id
        ).map((ps) => {
          const product = data.Products.find((p) => p.id === ps.productId);
          if (product) {
            product.addons = data.ProductAddons.filter(
              (pa) => pa.productId === product.id
            ).map((pa) => data.Addons.find((a) => a.id === pa.addonId)!);

            product.recommendedproducts =
              data.ProductRecommendedProducts.filter(
                (pr) => pr.productId === product.id
              ).map(
                (pr) =>
                  data.Products.find((p) => p.id === pr.recommendedProductId)!
              );
          }
          return product!;
        });
        return { ...subcategory, products };
      });
      return { ...category, Subcategories: subcategories };
    }),
    Products: [], // Initialize Products to avoid missing property error
  };

  result.Products = data.Products.map((product) => {
    product.addons = data.ProductAddons.filter(
      (pa) => pa.productId === product.id
    ).map((pa) => data.Addons.find((a) => a.id === pa.addonId)!);

    product.recommendedproducts = data.ProductRecommendedProducts.filter(
      (pr) => pr.productId === product.id
    ).map((pr) => data.Products.find((p) => p.id === pr.recommendedProductId)!);

    return product;
  });

  return result;
};

interface Price {
  priceKey: string;
  priceValue: number;
}

export const transformPriceArray = (prices: Price[]): Record<string, number>  => {
  return prices.reduce((acc, item) => {
    acc[item.priceKey] = item.priceValue; // Add key-value pair to the result object
    return acc;
  }, {} as Record<string, number>);
}
