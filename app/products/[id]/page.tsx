import type { Metadata } from "next";
import ProductClient from "./ProductClient";
import { SINGLE_PRODUCT } from "../../../lib/product";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SINGLE_PRODUCT.name,
    description: SINGLE_PRODUCT.description || `Buy ${SINGLE_PRODUCT.name}.`,
    openGraph: {
      title: SINGLE_PRODUCT.name,
      images:
        typeof SINGLE_PRODUCT.img1 === "string" ? [SINGLE_PRODUCT.img1] : [],
    },
  };
}

export default async function ProductDetailPage() {
  return <ProductClient product={SINGLE_PRODUCT} />;
}
