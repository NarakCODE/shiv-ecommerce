import axios from "axios";
import SearchClient from "./SearchClient";
import { apiProductsType, itemType } from "../../context/cart/cart-types";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const items: itemType[] = [];

  const backendUrl =
    process.env.NEXT_PUBLIC_PROD_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "";

  if (backendUrl && q) {
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/products/search?q=${encodeURIComponent(q)}`
      );
      if (res.data?.data && Array.isArray(res.data.data)) {
        res.data.data.forEach((product: apiProductsType) => {
          items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img1: product.image1,
            img2: product.image2,
          });
        });
      }
    } catch (error) {
      console.warn("Could not fetch search results on server:", error);
    }
  }

  return <SearchClient items={items} searchWord={q} />;
}
