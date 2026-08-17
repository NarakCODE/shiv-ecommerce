"use client";

import { useEffect, useState } from "react";
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
import { PRODUCT_IMAGES } from "../../../lib/product";
import DownArrow from "../../../public/icons/DownArrow";
import FacebookLogo from "../../../public/icons/FacebookLogo";
import InstagramLogo from "../../../public/icons/InstagramLogo";
import TiktokLogo from "../../../public/icons/TiktokLogo";
import Heart from "../../../public/icons/Heart";
import HeartSolid from "../../../public/icons/HeartSolid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button as ShadcnButton } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowExpand01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Call02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

type Props = {
  product: itemType;
  products?: itemType[];
};

export default function ProductClient({ product }: Props) {
  const { img1, img2, price } = product;

  const galleryImages = PRODUCT_IMAGES;

  const [mainImg, setMainImg] = useState(galleryImages[0]);
  const [currentQty, setCurrentQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const currentPreviewIndex =
    galleryImages.indexOf(mainImg) >= 0
      ? galleryImages.indexOf(mainImg)
      : 0;

  const handlePrevImage = () => {
    const nextIdx =
      currentPreviewIndex > 0
        ? currentPreviewIndex - 1
        : galleryImages.length - 1;
    setMainImg(galleryImages[nextIdx]);
  };

  const handleNextImage = () => {
    const nextIdx =
      currentPreviewIndex < galleryImages.length - 1
        ? currentPreviewIndex + 1
        : 0;
    setMainImg(galleryImages[nextIdx]);
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
        <div className="itemSection app-max-width app-x-padding py-10 flex flex-col md:flex-row gap-8 lg:gap-10">
          {/* Left Gallery */}
          <div className="imgSection w-full md:w-1/2 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            <div className="flex sm:flex-col gap-2.5 sm:gap-3 justify-center sm:justify-start overflow-x-auto no-scrollbar py-1">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMainImg(imgSrc)}
                  className={`relative size-16 sm:size-20 md:size-24 border transition-all overflow-hidden rounded-xs shrink-0 ${
                    mainImg === imgSrc
                      ? "border-gray500 ring-1 ring-gray500 opacity-100"
                      : "border-gray200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`${product.name} view ${idx + 1}`}
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
                src={mainImg}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Preview Overlay Badge */}
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="bg-white/90 backdrop-blur-xs text-gray-800 text-xs font-semibold px-3 py-1.5 shadow-sm border border-gray200 flex items-center gap-1.5 uppercase tracking-wider">
                  <HugeiconsIcon icon={ArrowExpand01Icon} className="size-3.5" />
                  Preview
                </span>
              </div>
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

            {/* Order / Inquire via Social Media Inbox */}
            <div className="pt-2 space-y-3.5">
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
                  <button
                    type="button"
                    onClick={handleWishlist}
                    aria-label="Toggle wishlist"
                    className="flex items-center gap-1 text-xs text-gray500 hover:text-red-500 transition-colors"
                  >
                    {alreadyWishlisted ? (
                      <HeartSolid extraClass="size-4 text-red-500" />
                    ) : (
                      <Heart extraClass="size-4" />
                    )}
                    <span>Wishlist</span>
                  </button>
                </div>
              </div>
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

      {/* ===== PRODUCT IMAGE PREVIEW DIALOG (SHADCN UI) ===== */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen h-dvh max-w-none sm:max-w-none rounded-none border-none bg-black/95 p-0 gap-0 overflow-hidden flex items-center justify-center ring-0 z-50"
        >
          {/* Accessible Hidden Header */}
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name} Image Preview</DialogTitle>
            <DialogDescription>
              Viewing image {currentPreviewIndex + 1} of {galleryImages.length}
            </DialogDescription>
          </DialogHeader>

          {/* Close Button */}
          <DialogClose
            render={
              <ShadcnButton
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
          {galleryImages.length > 1 && (
            <ShadcnButton
              variant="ghost"
              size="icon"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-30 size-11 sm:size-12 cursor-pointer transition-all"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-6" />
            </ShadcnButton>
          )}

          {/* Next Image Button */}
          {galleryImages.length > 1 && (
            <ShadcnButton
              variant="ghost"
              size="icon"
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-30 size-11 sm:size-12 cursor-pointer transition-all"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-6" />
            </ShadcnButton>
          )}

          {/* Center Image Container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-12">
            <div className="relative w-full max-w-4xl h-[70vh] sm:h-[75vh] max-h-[850px] flex items-center justify-center">
              <Image
                src={mainImg}
                alt={`${product.name} preview`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain select-none"
                priority
              />
            </div>

            {/* Bottom Thumbnails */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 z-30">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMainImg(imgSrc)}
                  className={`relative size-8 sm:size-10 rounded-xs overflow-hidden border transition-all ${
                    mainImg === imgSrc
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
    </div>
  );
}
