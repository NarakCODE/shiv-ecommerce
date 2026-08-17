"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Slideshow from "../components/HeroSection/Slideshow";
import TestiSlider from "../components/TestiSlider/TestiSlider";
import HowToUse from "../components/HowToUse";
import { itemType } from "../context/cart/cart-types";
import { useCart } from "../context/cart/CartProvider";
import { useWishlist } from "../context/wishlist/WishlistProvider";
import Heart from "../public/icons/Heart";
import HeartSolid from "../public/icons/HeartSolid";
import ourShop from "../public/bg-img/ourshop.png";

type Props = {
  initialProduct: itemType;
};

export default function HomeClient({ initialProduct }: Props) {
  const t = useTranslations("Index");
  const { addOne } = useCart();
  const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>(
    (initialProduct.img1 as string) || "/slider/slider-1.jpg"
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === initialProduct.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      deleteWishlistItem!(initialProduct);
    } else {
      addToWishlist!(initialProduct);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addOne!(initialProduct);
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const productImages = [
    "https://skinscience.bluelagoon.com/cdn/shop/files/GuaSha_Final-01.jpg?v=1738870888&width=1296",
    "/slider/slider-1.jpg",
    "/slider/slider-2.jpg",
    "/slider/slider-3.jpg",
  ];

  return (
    <>
      {/* ===== Header Section ===== */}
      <Header />

      {/* ===== Hero Slideshow ===== */}
      <Slideshow />

      <main id="main-content" className="-mt-20">
        {/* ===== Single Product Showcase Section ===== */}
        <section
          id="product-showcase"
          className="app-max-width app-x-padding py-16 md:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Product Media Gallery */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-3 justify-center sm:justify-start">
                {productImages.map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    className={`relative size-20 sm:size-24 border transition-all overflow-hidden rounded-xs ${
                      selectedImage === src
                        ? "border-gray500 ring-1 ring-gray500 opacity-100"
                        : "border-gray200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Gua Sha Tool view ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image View */}
              <div className="relative flex-1 aspect-4/3 sm:aspect-square bg-gray-50 border border-gray200 overflow-hidden rounded-xs group">
                <Image
                  src={selectedImage}
                  alt={initialProduct.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label="Toggle wishlist"
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 shadow-md backdrop-blur-xs text-gray500 hover:text-red-500 transition-colors"
                >
                  {isWishlisted ? (
                    <HeartSolid extraClass="size-5 text-red-500" />
                  ) : (
                    <Heart extraClass="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Right: Product Story, Pricing & Actions */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-gray400 font-semibold block mb-2">
                  Icelandic Mineral Wellness
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray500 font-medium tracking-wide">
                  {initialProduct.name}
                </h1>
              </div>

              {/* Rating & In Stock */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex text-amber-500 text-base">
                  ★★★★★
                </div>
                <span className="text-gray400 font-normal">
                  4.9 (128 reviews)
                </span>
                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium border border-emerald-200">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light text-gray500 tracking-tight">
                  ${initialProduct.price}.00
                </span>
                <span className="text-sm text-gray400">
                  Free Worldwide Shipping
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray400 leading-relaxed">
                {initialProduct.detail}
              </p>

              {/* Ritual Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-gray200 text-sm text-gray500">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gray500" />
                  <span>Stimulates lymphatic drainage & depuffs instantly</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gray500" />
                  <span>Sculpts jawline, cheekbones & lifts eye contours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gray500" />
                  <span>Enhances serum & bioactive oil penetration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gray500" />
                  <span>Crafted from pure volcanic Icelandic mineral stone</span>
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-gray300 rounded-none">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-gray500 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2.5 text-sm font-medium text-gray500 min-w-10 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-gray500 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 uppercase tracking-widest text-xs font-semibold transition-all duration-300 ${
                      addedAnimation
                        ? "bg-emerald-700 text-white"
                        : "bg-gray500 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {addedAnimation ? "✓ Added to Cart!" : "Add To Cart"}
                  </button>
                </div>

                {/* Direct Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={() => addOne!(initialProduct)}
                  className="block w-full text-center py-3 px-6 uppercase tracking-widest text-xs font-semibold border border-gray500 text-gray500 hover:bg-gray500 hover:text-white transition-all duration-300"
                >
                  Buy Now — Fast Checkout
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== How To Use Section (Videos + Carousel Preview) ===== */}
        <HowToUse />

        {/* ===== Testimonial Section ===== */}
        <section
          id="testimonials"
          className="w-full h-full py-16 flex flex-col items-center bg-lightgreen"
        >
          <span className="text-xs uppercase tracking-widest text-gray400 mb-2 block font-medium">
            Customer Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl text-gray500 font-normal tracking-wide text-center">
            {t("testimonial")}
          </h2>
          <TestiSlider />
        </section>

        {/* ===== Our Heritage / Our Shop Section ===== */}
        <section className="app-max-width mt-16 mb-20 flex flex-col justify-center items-center text-center">
          <div className="textBox w-3/4 md:w-2/4 lg:w-2/5 mb-6">
            <span className="text-xs uppercase tracking-widest text-gray400 mb-2 block font-medium">
              Icelandic Skin Science
            </span>
            <h2 className="text-3xl mb-4 text-gray500 font-normal">
              {t("our_shop")}
            </h2>
            <span className="w-full text-gray400 text-sm sm:text-base leading-relaxed">
              {t("our_shop_desc")}
            </span>
          </div>
          <div className="w-full app-x-padding flex justify-center">
            <Image
              src={ourShop}
              alt="Our Shop & Icelandic Heritage"
              className="rounded-xs shadow-sm"
            />
          </div>
        </section>
      </main>

      {/* ===== Footer Section ===== */}
      <Footer />
    </>
  );
}
