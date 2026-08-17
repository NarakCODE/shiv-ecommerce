"use client";

import React, { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogBackdrop, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

import SearchIcon from "../../public/icons/SearchIcon";
import { itemType } from "../../context/cart/cart-types";
import { SINGLE_PRODUCT } from "../../lib/product";

export default function SearchForm() {
  const t = useTranslations("Navigation");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItems, setSearchItems] = useState<itemType[]>([]);
  const [noResult, setNoResult] = useState(false);

  function closeModal() {
    setOpen(false);
    setSearchItems([]);
    setNoResult(false);
  }

  function openModal() {
    setOpen(true);
  }

  const performSearch = (val: string) => {
    const q = val.trim().toLowerCase();
    if (
      !q ||
      SINGLE_PRODUCT.name.toLowerCase().includes(q) ||
      "gua sha tool skincare porcelain".includes(q)
    ) {
      setSearchItems([SINGLE_PRODUCT]);
      setNoResult(false);
    } else {
      setSearchItems([]);
      setNoResult(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch(searchValue);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setSearchValue(val);
    performSearch(val);
  };

  return (
    <>
      <div>
        <button type="button" aria-label="Search" onClick={openModal}>
          <SearchIcon />
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[99999] overflow-y-auto"
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen text-center relative z-[99999]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[99998]" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray900"
                  >
                    Search Store
                  </Dialog.Title>
                  <button
                    type="button"
                    className="outline-none focus:outline-none text-2xl"
                    onClick={closeModal}
                  >
                    &#10005;
                  </button>
                </div>

                <form className="mt-2" onSubmit={handleSubmit}>
                  <input
                    type="search"
                    placeholder={t("search_anything")}
                    className="px-4 py-2 border border-gray200 w-full focus:outline-none"
                    onChange={handleChange}
                    autoFocus
                  />
                </form>

                {searchItems.length > 0 && (
                  <div className="text-left mt-4 border-t border-gray200 pt-3">
                    <p className="text-xs uppercase tracking-wider text-gray400 mb-2 font-medium">
                      Matching Products
                    </p>
                    <div className="space-y-3">
                      {searchItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${item.id}`}
                          onClick={closeModal}
                          className="flex items-center gap-3 p-2 hover:bg-gray100 rounded transition-colors"
                        >
                          <div className="relative size-14 border border-gray200 shrink-0">
                            <Image
                              src={item.img1 as string}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray500">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray400">${item.price}.00</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {noResult && (
                  <div className="text-center my-6 text-gray400 text-sm">
                    {t("no_result")} for &ldquo;{searchValue}&rdquo;
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
