import type { Metadata } from "next";
import axios from "axios";
import CategoryClient from "./CategoryClient";
import { apiProductsType, itemType } from "../../../context/cart/cart-types";

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
    orderby?: "latest" | "price" | "price-desc";
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: capitalized,
    description: `Browse our ${capitalized} collection at Haru Fashion.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const query = await searchParams;
  const page = query.page ? +query.page : 1;
  const orderby = query.orderby || "latest";

  const start = page === 1 ? 0 : (page - 1) * 10;
  let numberOfProducts = 0;
  const items: itemType[] = [];

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_PROD_BACKEND_URL ||
    "";

  if (backendUrl) {
    try {
      if (category !== "new-arrivals") {
        const countRes = await axios.get(
          `${backendUrl}/api/v1/products/count?category=${category}`
        );
        numberOfProducts = +countRes.data.count || 0;
      } else {
        numberOfProducts = 10;
      }

      let order_by: string;
      if (orderby === "price") {
        order_by = "price";
      } else if (orderby === "price-desc") {
        order_by = "price.desc";
      } else {
        order_by = "createdAt.desc";
      }

      const reqUrl =
        category === "new-arrivals"
          ? `${backendUrl}/api/v1/products?order_by=createdAt.desc&limit=10`
          : `${backendUrl}/api/v1/products?order_by=${order_by}&offset=${start}&limit=10&category=${category}`;

      const res = await axios.get(reqUrl);
      if (res.data?.data && Array.isArray(res.data.data)) {
        res.data.data.forEach((product: apiProductsType) => {
          items.push({
            ...product,
            img1: product.image1,
            img2: product.image2,
          });
        });
      }
    } catch (error) {
      console.warn("Could not fetch category products on server:", error);
    }
  }

  return (
    <CategoryClient
      items={items}
      category={category}
      page={page}
      numberOfProducts={numberOfProducts}
      orderby={orderby}
    />
  );
}
