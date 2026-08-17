"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Disclosure } from "@headlessui/react";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Button from "../../../components/Buttons/Button";
import GhostButton from "../../../components/Buttons/GhostButton";
import HowToUse from "../../../components/HowToUse";
import { itemType } from "../../../context/cart/cart-types";
import { useCart } from "../../../context/cart/CartProvider";
import { useWishlist } from "../../../context/wishlist/WishlistProvider";
import DownArrow from "../../../public/icons/DownArrow";
import FacebookLogo from "../../../public/icons/FacebookLogo";
import InstagramLogo from "../../../public/icons/InstagramLogo";
import TiktokLogo from "../../../public/icons/TiktokLogo";
import Heart from "../../../public/icons/Heart";
import HeartSolid from "../../../public/icons/HeartSolid";

type Props = {
  product: itemType;
  products?: itemType[];
};

export default function ProductClient({ product }: Props) {
  const { img1, img2, price } = product;

  const galleryImages = [
    (img1 as string) || "https://skinscience.bluelagoon.com/cdn/shop/files/GuaSha_Final-01.jpg?v=1738870888&width=1296",
    "/slider/slider-1.jpg",
    "/slider/slider-2.jpg",
    "/slider/slider-3.jpg",
  ];

  const [mainImg, setMainImg] = useState(galleryImages[0]);
  const [currentQty, setCurrentQty] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist();

  const currentItem: itemType = {
    ...product,
    qty: currentQty,
  };

  const alreadyWishlisted =
    wishlist.filter((wItem) => wItem.id === product.id).length > 0;

  const handleWishlist = () => {
    alreadyWishlisted
      ? deleteWishlistItem!(currentItem)
      : addToWishlist!(currentItem);
  };

  const handleAddToCart = () => {
    addItem!(currentItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div>
      {/* ===== Head Section ===== */}
      <Header title={`${product.name} - Blue Lagoon Skincare`} />

      <main id="main-content">
        {/* ===== Breadcrumb Section ===== */}
        <div className="bg-lightgreen h-16 w-full flex items-center border-t-2 border-gray200">
          <div className="app-x-padding app-max-width w-full">
            <div className="breadcrumb text-sm">
              <Link href="/" className="text-gray400 hover:text-gray500">
                Home
              </Link>{" "}
              / <span className="text-gray500">{product.name}</span>
            </div>
          </div>
        </div>

        {/* ===== Main Content Section ===== */}
        <div className="itemSection app-max-width app-x-padding py-10 flex flex-col md:flex-row gap-10">
          {/* Left Gallery */}
          <div className="imgSection w-full md:w-1/2 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-3 justify-center sm:justify-start">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMainImg(imgSrc)}
                  className={`relative size-20 border transition-all overflow-hidden rounded-xs ${
                    mainImg === imgSrc
                      ? "border-gray500 ring-1 ring-gray500 opacity-100"
                      : "border-gray200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 aspect-square bg-gray-50 border border-gray200 overflow-hidden rounded-xs">
              <Image
                src={mainImg}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Product Info */}
          <div className="infoSection w-full md:w-1/2 flex flex-col space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-gray400 font-semibold block mb-1">
                Authentic Icelandic Skincare
              </span>
              <h1 className="text-2xl sm:text-3xl text-gray500 font-normal tracking-wide">
                {product.name}
              </h1>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-light text-gray500">
                ${price}.00
              </span>
              <div className="flex items-center text-amber-500 text-sm">
                ★★★★★ <span className="text-gray400 ml-1.5">(128 reviews)</span>
              </div>
            </div>

            {/* In Stock Badge */}
            <div>
              <span className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200">
                In Stock & Free Shipping
              </span>
            </div>

            {/* Short Description */}
            <p className="text-gray400 text-sm sm:text-base leading-relaxed">
              {product.detail}
            </p>

            {/* Size Spec */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-gray400 font-medium block mb-1.5">
                Specification
              </span>
              <span className="inline-block px-3 py-1.5 border border-gray300 text-xs text-gray500 font-medium">
                One Size — Ergonomic Facial Contour
              </span>
            </div>

            {/* Quantity & Actions */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center border border-gray300">
                  <button
                    type="button"
                    onClick={() => setCurrentQty(Math.max(1, currentQty - 1))}
                    className="px-3.5 py-2.5 text-gray500 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 text-sm font-medium text-gray500 min-w-10 text-center">
                    {currentQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentQty(currentQty + 1)}
                    className="px-3.5 py-2.5 text-gray500 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <Button
                  value={added ? "✓ Added To Cart" : "Add To Cart"}
                  size="lg"
                  extraClass={`flex-1 text-center uppercase tracking-widest text-xs font-semibold ${
                    added ? "bg-emerald-700 text-white" : ""
                  }`}
                  onClick={handleAddToCart}
                />

                {/* Wishlist toggle */}
                <GhostButton onClick={handleWishlist}>
                  {alreadyWishlisted ? (
                    <HeartSolid extraClass="size-5 text-red-500" />
                  ) : (
                    <Heart extraClass="size-5" />
                  )}
                </GhostButton>
              </div>

              <Link
                href="/checkout"
                onClick={() => addItem!(currentItem)}
                className="block w-full text-center py-3 px-6 uppercase tracking-widest text-xs font-semibold border border-gray500 text-gray500 hover:bg-gray500 hover:text-white transition-all duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>

            {/* Accordion Details */}
            <div className="pt-4 border-t border-gray200">
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="py-2.5 w-full focus:outline-none text-left flex items-center justify-between font-medium text-gray500">
                      <span>Ritual & Material Details</span>
                      <DownArrow
                        extraClass={`${
                          open ? "" : "transform rotate-180"
                        } size-4 text-gray500 transition-transform`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray400 text-sm leading-relaxed pt-2 pb-4">
                      {product.detail}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs uppercase tracking-wider text-gray400">
                Follow &amp; Share:
              </span>
              <a
                href="https://www.facebook.com/chii.shiv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="text-gray400 hover:text-gray500 transition-colors"
              >
                <FacebookLogo extraClass="h-4" />
              </a>
              <a
                href="https://www.instagram.com/shiv_chii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="text-gray400 hover:text-gray500 transition-colors"
              >
                <InstagramLogo extraClass="h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@chiishiv09?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Profile"
                className="text-gray400 hover:text-gray500 transition-colors"
              >
                <TiktokLogo extraClass="h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ===== How To Use & Videos Preview Section ===== */}
        <div className="border-t border-gray200">
          <HowToUse />
        </div>
      </main>

      {/* ===== Footer Section ===== */}
      <Footer />
    </div>
  );
}
