"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPriceArray = exports.transformData = void 0;
const attachAddons = (product, data) => {
    product.addons = data.ProductAddons.filter((pa) => { return pa.productId === product.id; })
        .map((pa) => { return data.Addons.find((a) => { return a.id === pa.addonId; }); })
        .filter((addon) => { return addon; });
    return product;
};
const attachRecommendedProducts = (product, data) => {
    product.recommendedproducts = data.ProductRecommendedProducts.filter((pr) => { return pr.productId === product.id; })
        .map((pr) => {
        return data.Products.find((p) => { return p.id === pr.recommendedProductId; });
        // return data.Products.find((p) => {return p.id === pr.recommendedProductId;})!;
    })
        .filter((recommended) => { return recommended; });
    return product;
};
const transformSubcategories = (categoryId, data) => {
    return data.Subcategories.filter((subcategory) => { return subcategory.categoryId === categoryId; }).map((subcategory) => {
        const products = data.ProductSubcategories.filter((ps) => { return ps.subcategoryId === subcategory.id; })
            .map((ps) => {
            const product = data.Products.find((p) => { return p.id === ps.productId; });
            if (product) {
                const productWithAddons = attachAddons(product, data);
                const productWithRecommendations = attachRecommendedProducts(productWithAddons, data);
                return productWithRecommendations;
            }
            return undefined;
        })
            .filter((product) => { return product !== undefined; });
        return { ...subcategory, products };
    });
};
const transformData = (data) => {
    const result = {
        id: data.id,
        name: data.name,
        Categories: data.Categories.map((category) => {
            const subcategories = transformSubcategories(category.id, data);
            return { ...category, Subcategories: subcategories };
        }),
        Products: data.Products.map((product) => {
            const productWithAddons = attachAddons(product, data);
            const productWithRecommendations = attachRecommendedProducts(productWithAddons, data);
            return productWithRecommendations;
        }),
    };
    return result;
};
exports.transformData = transformData;
const transformPriceArray = (prices) => {
    return prices.reduce((accumulator, item) => {
        accumulator[item.priceKey] = item.priceValue; // Add key-value pair to the result object
        return accumulator;
    }, {});
};
exports.transformPriceArray = transformPriceArray;
