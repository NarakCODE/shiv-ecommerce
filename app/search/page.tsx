import SearchClient from "./SearchClient";
import { SINGLE_PRODUCT } from "../../lib/product";
import { itemType } from "../../context/cart/cart-types";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const items: itemType[] = [];

  const query = q.trim().toLowerCase();
  if (
    !query ||
    SINGLE_PRODUCT.name.toLowerCase().includes(query) ||
    "gua sha tool skincare".includes(query)
  ) {
    items.push(SINGLE_PRODUCT);
  }

  return <SearchClient items={items} searchWord={q} />;
}
