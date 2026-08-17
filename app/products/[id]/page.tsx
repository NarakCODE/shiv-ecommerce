import type { Metadata } from "next";
import axios from "axios";
import ProductClient from "./ProductClient";
import { apiProductsType, itemType } from "../../../context/cart/cart-types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getProductData(id: string) {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_PROD_BACKEND_URL ||
    "";

  let product: itemType = {
    id: +id || 1,
    name: "Product",
    price: 0,
    detail: "",
    img1: "/bg-img/placeholder.jpg",
    img2: "/bg-img/placeholder.jpg",
    categoryName: "women",
  };

  let products: itemType[] = [];

  if (backendUrl) {
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/products/${id}?include=category`
      );
      const fetchedProduct: apiProductsType = res.data.data;
      if (fetchedProduct) {
        product = {
          id: fetchedProduct.id,
          name: fetchedProduct.name,
          price: fetchedProduct.price,
          detail: fetchedProduct.detail,
          img1: fetchedProduct.image1,
          img2: fetchedProduct.image2,
          categoryName: fetchedProduct.category?.name || "women",
        };

        const randomProductRes = await axios.get(
          `${backendUrl}/api/v1/products?category=${product.categoryName}`
        );
        const fetchedProducts: apiProductsType[] =
          randomProductRes.data.data || [];
        const shuffled = [...fetchedProducts].sort(() => 0.5 - Math.random());
        const randomFetchedProducts = shuffled.slice(0, 5);

        randomFetchedProducts.forEach((rp) => {
          products.push({
            id: rp.id,
            name: rp.name,
            price: rp.price,
            img1: rp.image1,
            img2: rp.image2,
          });
        });
      }
    } catch (error) {
      console.warn("Could not fetch product details on server:", error);
    }
  }

  return { product, products };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { product } = await getProductData(id);
  return {
    title: product.name,
    description: product.description || `Buy ${product.name} at Haru Fashion.`,
    openGraph: {
      title: product.name,
      images: typeof product.img1 === "string" ? [product.img1] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const { product, products } = await getProductData(id);
  return <ProductClient product={product} products={products} />;
}
