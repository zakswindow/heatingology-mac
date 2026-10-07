import { Product, ProductType } from "@prisma/client";

export function hasProduct ({ match, products }: { match: (product: Product) => boolean; products: Product[]}) {
    return products.find(match);
}

export function getProductsTotalPrice (products: Product[]) {
    return products.reduce((acc, product) => {
        return acc + (product.priceWithVat > 0 ? product.priceWithVat : product.price)
    }, 0);
}

export function filterProductsByProductType ({ products, productType }: { products: Product[]; productType: ProductType | ProductType[] }) {
    if (Array.isArray(productType)) {
        return products.filter((item) => {
            return productType.indexOf(item.productType) >= 0;
        });
    }
    
    return products.filter((item) => item.productType === productType );
}