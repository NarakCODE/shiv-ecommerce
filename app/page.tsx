import axios from "axios";
import HomeClient from "./HomeClient";
import { apiProductsType, itemType } from "../context/cart/cart-types";

async function getInitialProducts(): Promise<itemType[]> {
  const products: itemType[] = [];
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_PROD_BACKEND_URL ||
    "";
  if (!backendUrl) return products;

  try {
    const res = await axios.get(
      `${backendUrl}/api/v1/products?order_by=createdAt.desc&limit=10`
    );
    const fetchedProducts = res.data;
    if (fetchedProducts && Array.isArray(fetchedProducts.data)) {
      fetchedProducts.data.forEach((product: apiProductsType) => {
        products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          img1: product.image1,
          img2: product.image2,
        });
      });
    }
  } catch (error) {
    console.warn("Could not fetch products on server:", error);
  }
  return products;
}

export default async function HomePage() {
  const products = await getInitialProducts();
  return <HomeClient initialProducts={products} />;
}
