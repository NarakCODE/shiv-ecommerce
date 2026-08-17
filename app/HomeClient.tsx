"use client";

import React, { useEffect, useState } from "react";
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
import { SINGLE_PRODUCT, PRODUCT_IMAGES } from "../lib/product";
import Heart from "../public/icons/Heart";
import HeartSolid from "../public/icons/HeartSolid";
import FacebookLogo from "../public/icons/FacebookLogo";
import InstagramLogo from "../public/icons/InstagramLogo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowExpand01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Call02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

type Props = {
  initialProduct?: itemType;
  initialProducts?: itemType[];
};

export default function HomeClient({
  initialProduct,
  initialProducts,
}: Props) {
  const activeProduct =
    initialProduct ||
    (Array.isArray(initialProducts) && initialProducts.length > 0
      ? initialProducts[0]
      : SINGLE_PRODUCT);

  const t = useTranslations("Index");
  const { addOne } = useCart();
  const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>(
    (activeProduct.img1 as string) || PRODUCT_IMAGES[0]
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const productImages = PRODUCT_IMAGES;
  const currentPreviewIndex =
    productImages.indexOf(selectedImage) >= 0
      ? productImages.indexOf(selectedImage)
      : 0;

  const handlePrevImage = () => {
    const nextIdx =
      currentPreviewIndex > 0
        ? currentPreviewIndex - 1
        : productImages.length - 1;
    setSelectedImage(productImages[nextIdx]);
  };

  const handleNextImage = () => {
    const nextIdx =
      currentPreviewIndex < productImages.length - 1
        ? currentPreviewIndex + 1
        : 0;
    setSelectedImage(productImages[nextIdx]);
  };

  // Keyboard navigation for image preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPreviewOpen) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewOpen, currentPreviewIndex]);

  const isWishlisted = wishlist.some((item) => item.id === activeProduct.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      deleteWishlistItem!(activeProduct);
    } else {
      addToWishlist!(activeProduct);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addOne!(activeProduct);
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

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
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 w-full">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-2.5 sm:gap-3 justify-center sm:justify-start overflow-x-auto no-scrollbar py-1">
                {productImages.map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    className={`relative size-16 sm:size-20 md:size-24 border transition-all overflow-hidden rounded-xs shrink-0 ${
                      selectedImage === src
                        ? "border-gray500 ring-1 ring-gray500 opacity-100"
                        : "border-gray200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Gua Sha Tool view ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 64px, 96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image View with Preview Trigger */}
              <div
                onClick={() => setIsPreviewOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsPreviewOpen(true);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Click to preview image full screen"
                className="relative flex-1 w-full aspect-square bg-gray-50 border border-gray200 overflow-hidden rounded-xs group cursor-zoom-in"
              >
                <Image
                  src={selectedImage}
                  alt={activeProduct.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 55vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Preview Overlay Badge */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="bg-white/90 backdrop-blur-xs text-gray-800 text-xs font-semibold px-3 py-1.5 shadow-sm border border-gray200 flex items-center gap-1.5 uppercase tracking-wider">
                    <HugeiconsIcon icon={ArrowExpand01Icon} className="size-3.5" />
                    Preview
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist();
                  }}
                  aria-label="Toggle wishlist"
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 shadow-md backdrop-blur-xs text-gray500 hover:text-red-500 transition-colors z-10"
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
                  {activeProduct.name}
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

              {/* Order / Inquire via Social Media Inbox */}
              <div className="pt-1 space-y-3.5">
                <div className="bg-lightgreen border border-emerald-200/80 p-4 sm:p-5 rounded-xs space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      Inquire &amp; Order via Inbox
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      Fast Reply
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray500 leading-relaxed font-normal">
                    តបតែតាម fb និង IG ជាមួយ Telegram ណាបងៗ — Contact us directly on social media:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {/* Facebook Order Button */}
                    <a
                      href="https://www.facebook.com/chii.shiv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white py-3 px-4 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow-md"
                    >
                      <FacebookLogo extraClass="size-4" />
                      <span>Order on Facebook</span>
                    </a>

                    {/* Instagram Order Button */}
                    <a
                      href="https://www.instagram.com/shiv_chii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white py-3 px-4 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow-md"
                    >
                      <InstagramLogo extraClass="size-4" />
                      <span>Order on Instagram</span>
                    </a>
                  </div>

                  {/* Direct Contact Phone Link */}
                  <div className="pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-xs text-gray500">
                    <div className="flex items-center gap-1.5">
                      <HugeiconsIcon icon={Call02Icon} className="size-3.5 text-gray400" />
                      <span>Direct Line:</span>
                      <a
                        href="tel:0883979971"
                        className="font-semibold text-gray700 hover:text-black transition-colors"
                      >
                        0883979971
                      </a>
                    </div>
                    <span className="text-emerald-700 font-medium">
                      100% Authentic Guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== How To Use Section (Videos + Carousel Preview) ===== */}
        <HowToUse />

        {/* ===== Testimonial Section ===== */}
        <section
          id="testimonials"
          className="w-full py-16 md:py-24 bg-lightgreen"
        >
          <div className="app-max-width app-x-padding">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
              <span className="text-xs uppercase tracking-widest text-gray400 mb-2 block font-medium">
                Customer Experiences
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray500 font-normal tracking-wide text-center">
                {t("testimonial")}
              </h2>
              <div className="w-16 h-0.5 bg-gray500 mx-auto mt-4"></div>
            </div>
            <TestiSlider />
          </div>
        </section>
      </main>

      {/* ===== Footer Section ===== */}
      <Footer />

      {/* ===== PRODUCT IMAGE PREVIEW DIALOG (SHADCN UI) ===== */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen h-dvh max-w-none sm:max-w-none rounded-none border-none bg-black/95 p-0 gap-0 overflow-hidden flex items-center justify-center ring-0 z-50"
        >
          {/* Accessible Hidden Header */}
          <DialogHeader className="sr-only">
            <DialogTitle>{activeProduct.name} Image Preview</DialogTitle>
            <DialogDescription>
              Viewing image {currentPreviewIndex + 1} of {productImages.length}
            </DialogDescription>
          </DialogHeader>

          {/* Close Button */}
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-30 size-10 sm:size-11 cursor-pointer transition-all"
              />
            }
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
            <span className="sr-only">Close preview</span>
          </DialogClose>

          {/* Previous Image Button */}
          {productImages.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-30 size-11 sm:size-12 cursor-pointer transition-all"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-6" />
            </Button>
          )}

          {/* Next Image Button */}
          {productImages.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-30 size-11 sm:size-12 cursor-pointer transition-all"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-6" />
            </Button>
          )}

          {/* Center Image Container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-12">
            <div className="relative w-full max-w-4xl h-[70vh] sm:h-[75vh] max-h-[850px] flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={`${activeProduct.name} preview`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain select-none"
                priority
              />
            </div>

            {/* Bottom Thumbnails */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 z-30">
              {productImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgSrc)}
                  className={`relative size-8 sm:size-10 rounded-xs overflow-hidden border transition-all ${
                    selectedImage === imgSrc
                      ? "border-white scale-110 ring-1 ring-white"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={imgSrc}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
