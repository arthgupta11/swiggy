import { TAddon, TDataInput, TProduct, TRestrauntData } from './interface';


const preprocessData = (data: TDataInput) => {
  const addonMap = new Map(data.Addons.map((a) => [a.id, a]));
  const productMap = new Map(data.Products.map((p) => [p.id, p]));

  const productAddonsMap = new Map<number, TAddon[]>();
  for (const pa of data.ProductAddons) {
    if (!productAddonsMap.has(pa.productId)) {
      productAddonsMap.set(pa.productId, []);
    }
    const addon = addonMap.get(pa.addonId);
    if (addon) {
      productAddonsMap.get(pa.productId)!.push(addon);
    }
  }

  const recommendedProductsMap = new Map<number, TProduct[]>();
  for (const pr of data.ProductRecommendedProducts) {
    if (!recommendedProductsMap.has(pr.productId)) {
      recommendedProductsMap.set(pr.productId, []);
    }
    const recommendedProduct = productMap.get(pr.recommendedProductId);
    if (recommendedProduct) {
      recommendedProductsMap.get(pr.productId)!.push(recommendedProduct);
    }
  }

  const productSubcategoriesMap = new Map<number, TProduct[]>();
  for (const ps of data.ProductSubcategories) {
    if (!productSubcategoriesMap.has(ps.subcategoryId)) {
      productSubcategoriesMap.set(ps.subcategoryId, []);
    }
    const product = productMap.get(ps.productId);
    if (product) {
      productSubcategoriesMap.get(ps.subcategoryId)!.push({
        ...product,
        addons: productAddonsMap.get(product.id) || [],
        recommendedproducts: recommendedProductsMap.get(product.id) || [],
      });
    }
  }

  return { addonMap, productMap, productAddonsMap, recommendedProductsMap, productSubcategoriesMap };
};

export const transformData = (data: TDataInput): TRestrauntData => {
  const { productSubcategoriesMap } = preprocessData(data);

  return {
    id: data.id,
    name: data.name,
    Categories: data.Categories.map((category) => {
      return {
        ...category,
        Subcategories: data.Subcategories
          .filter((sub) => sub.categoryId === category.id)
          .map((subcategory) => ({
            ...subcategory,
            products: productSubcategoriesMap.get(subcategory.id) || [],
          })),
      };
    }),
    Products: data.Products.map((product) => ({
      ...product,
      addons: productSubcategoriesMap.get(product.id) || [],
      recommendedproducts: productSubcategoriesMap.get(product.id) || [],
    })),
  };
};




interface Price {
  priceKey: string;
  priceValue: number;
}

export const transformPriceArray = (
  prices: Price[]
): Record<string, number> => {
  return prices.reduce(
    (accumulator, item) => {
      accumulator[item.priceKey] = item.priceValue; // Add key-value pair to the result object
      return accumulator;
    },
    {} as Record<string, number>
  );
};
