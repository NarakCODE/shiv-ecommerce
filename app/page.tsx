import HomeClient from "./HomeClient";
import { SINGLE_PRODUCT } from "../lib/product";

export default async function HomePage() {
  return <HomeClient initialProduct={SINGLE_PRODUCT} />;
}
