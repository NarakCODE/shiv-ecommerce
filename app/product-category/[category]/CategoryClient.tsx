"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import { useTranslations } from "next-intl";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Card from "../../../components/Card/Card";
import Pagination from "../../../components/Util/Pagination";
import { itemType } from "../../../context/cart/cart-types";
import DownArrow from "../../../public/icons/DownArrow";

type OrderType = "latest" | "price" | "price-desc";

type Props = {
  items: itemType[];
  category: string;
  page: number;
  numberOfProducts: number;
  orderby: OrderType;
};

export default function CategoryClient({
  items,
  category,
  page,
  numberOfProducts,
  orderby,
}: Props) {
  const t = useTranslations("Category");

  const lastPage = Math.ceil(numberOfProducts / 10);

  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const firstIndex = page === 1 ? page : page * 10 - 9;
  const lastIndex = page * 10;

  return (
    <div>
      {/* ===== Head Section ===== */}
      <Header title={`${capitalizedCategory} - Haru Fashion`} />

      <main id="main-content">
        {/* ===== Breadcrumb Section ===== */}
        <div className="bg-lightgreen h-16 w-full flex items-center">
          <div className="app-x-padding app-max-width w-full">
            <div className="breadcrumb">
              <Link href="/" className="text-gray400">
                {t("home")}
              </Link>{" "}
              / <span className="capitalize">{t(category as string)}</span>
            </div>
          </div>
        </div>

        {/* ===== Heading & Filter Section ===== */}
        <div className="app-x-padding app-max-width w-full mt-8">
          <h3 className="text-4xl mb-2 capitalize">{t(category as string)}</h3>
          <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-0 justify-between mt-4 sm:mt-6">
            <span>
              {t("showing_from_to", {
                from: firstIndex,
                to: numberOfProducts < lastIndex ? numberOfProducts : lastIndex,
                all: numberOfProducts,
              })}
            </span>
            {category !== "new-arrivals" && (
              <SortMenu category={category} orderby={orderby} />
            )}
          </div>
        </div>

        {/* ===== Main Content Section ===== */}
        <div className="app-x-padding app-max-width mt-3 mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          {category !== "new-arrivals" && (
            <Pagination
              category={category}
              currentPage={page}
              lastPage={lastPage}
              orderby={orderby}
            />
          )}
        </div>
      </main>

      {/* ===== Footer Section ===== */}
      <Footer />
    </div>
  );
}

const SortMenu: React.FC<{ category: string; orderby: OrderType }> = ({
  category,
  orderby,
}) => {
  const t = useTranslations("Navigation");
  const router = useRouter();

  let currentOrder: string;

  if (orderby === "price") {
    currentOrder = "sort_by_price";
  } else if (orderby === "price-desc") {
    currentOrder = "sort_by_price_desc";
  } else {
    currentOrder = "sort_by_latest";
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button as="button" className="flex items-center capitalize">
        {t(currentOrder)} <DownArrow />
      </Menu.Button>
      <Menu.Items className="flex flex-col z-10 items-start text-xs sm:text-sm w-auto sm:right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=latest`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_latest" && "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_latest")}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=price`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_price" && "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_price")}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=price-desc`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_price_desc" &&
                "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_price_desc")}
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
