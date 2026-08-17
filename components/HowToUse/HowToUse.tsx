"use client";

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import styles from "./HowToUse.module.css";

type Props = {
  extraClass?: string;
};

type MediaItem = {
  id: string;
  type: "video" | "image";
  title: string;
  subtitle?: string;
  src: string;
  alt?: string;
};

const videos: MediaItem[] = [
  {
    id: "vid-1",
    type: "video",
    title: "Technique 1: Neck & Lymphatic Drainage",
    subtitle: "Neck Massage",
    src: "/videos/how-to-use-1.mp4",
  },
  {
    id: "vid-2",
    type: "video",
    title: "Technique 2: Jawline Definition",
    subtitle: "Jaw Sculpting",
    src: "/videos/how-to-use-2.mp4",
  },
  {
    id: "vid-3",
    type: "video",
    title: "Technique 3: Cheeks & Temples",
    subtitle: "Cheek Depuffing",
    src: "/videos/how-to-use-3.mp4",
  },
  {
    id: "vid-4",
    type: "video",
    title: "Technique 4: Eyes & Forehead",
    subtitle: "Eye & Forehead Lift",
    src: "/videos/how-to-use-4.mp4",
  },
];

const sliderImages: MediaItem[] = [
  {
    id: "img-1",
    type: "image",
    title: "Ritual Guide: Step by Step",
    src: "/slider/slider-1.jpg",
    alt: "Gua Sha Ritual Guide 1",
  },
  {
    id: "img-2",
    type: "image",
    title: "Skin Anatomy & Pressure Points",
    src: "/slider/slider-2.jpg",
    alt: "Gua Sha Ritual Guide 2",
  },
  {
    id: "img-3",
    type: "image",
    title: "Daily Lifting & Sculpting Guide",
    src: "/slider/slider-3.jpg",
    alt: "Gua Sha Ritual Guide 3",
  },
  {
    id: "img-4",
    type: "image",
    title: "Product Layering & Benefits",
    src: "/slider/slider-4.jpg",
    alt: "Gua Sha Ritual Guide 4",
  },
  {
    id: "img-5",
    type: "image",
    title: "Firming & Glow Results",
    src: "/slider/slider-5.jpg",
    alt: "Gua Sha Ritual Guide 5",
  },
  {
    id: "img-6",
    type: "image",
    title: "Care & Cleansing Guide",
    src: "/slider/slider-6.jpg",
    alt: "Gua Sha Ritual Guide 6",
  },
];

const allMediaItems: MediaItem[] = [...videos, ...sliderImages];

const HowToUse: React.FC<Props> = ({ extraClass = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalApi, setModalApi] = useState<CarouselApi>();
  const [currentModalSlide, setCurrentModalSlide] = useState(0);

  const openModalAt = (index: number) => {
    setSelectedIndex(index);
    setCurrentModalSlide(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!modalApi) return;
    modalApi.scrollTo(selectedIndex, true);

    const onSelect = () => {
      setCurrentModalSlide(modalApi.selectedScrollSnap());
    };

    modalApi.on("select", onSelect);
    return () => {
      modalApi.off("select", onSelect);
    };
  }, [modalApi, selectedIndex, isOpen]);

  return (
    <>
      <section
        id="how-to-use"
        className={`${styles.sectionContainer} ${extraClass}`}
      >
        <div className="app-max-width app-x-padding">
          {/* ===== Section Title ===== */}
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-gray400 mb-2 block font-medium">
              Ritual &amp; Guide
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray500 font-normal tracking-wide text-center">
              How To Use the Blue Lagoon Skincare Gua Sha Tool
            </h2>
            <div className="w-16 h-0.5 bg-gray500 mx-auto mt-4"></div>
          </div>

          {/* ===== Full-Width Container Image ===== */}
          <div className="w-full overflow-hidden my-8 md:my-12 shadow-sm border border-gray200">
            <Image
              src="https://skinscience.bluelagoon.com/cdn/shop/files/GuaSha_Final-01.jpg?v=1738870888&width=1296"
              alt="How To Use the Blue Lagoon Skincare Gua Sha Tool"
              width={1296}
              height={729}
              layout="responsive"
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* ===== Plain Typography Instructions & Benefits ===== */}
          <div className="max-w-4xl mx-auto my-12 space-y-8 text-gray500 leading-relaxed">
            {/* Step 1 */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-medium text-gray500 tracking-wide pb-1">
                Step 1: Prep Your Skin
              </h3>
              <p className="text-sm sm:text-base text-gray400">
                Proper preparation is key to ensure the tool glides smoothly
                across your skin. Start with a freshly cleansed face, then apply
                either:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm sm:text-base text-gray400">
                <li>
                  <strong className="text-gray500 font-medium">
                    BL+ The Serum
                  </strong>{" "}
                  for intense hydration and barrier support.
                </li>
                <li>
                  <strong className="text-gray500 font-medium">
                    Algae Bioactive Concentrate Face Oil
                  </strong>{" "}
                  for deep nourishment.
                </li>
                <li>
                  <strong className="text-gray500 font-medium">
                    Layering both
                  </strong>{" "}
                  for enhanced benefits and a luxurious feel.
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-medium text-gray500 tracking-wide pb-1">
                Step 2: Follow These Gua Sha Techniques
              </h3>
              <p className="text-sm sm:text-base text-gray400">
                For each step, use three to five strokes, always moving upward
                and outward to promote lymphatic drainage and lifting effects.
                Hold the gua sha tool at a 30-45 degree angle and apply gentle
                pressure.
              </p>
              <div className="space-y-3 pt-1">
                <div className="pl-4 border-l-2 border-gray200 text-sm sm:text-base text-gray400">
                  <strong className="text-gray500 font-medium">Neck:</strong>{" "}
                  Start at the base of your neck and glide the flat side upward
                  toward your jawline. This motion helps stimulate lymphatic
                  drainage and reduce tension.
                </div>
                <div className="pl-4 border-l-2 border-gray200 text-sm sm:text-base text-gray400">
                  <strong className="text-gray500 font-medium">
                    Jawline:
                  </strong>{" "}
                  Place the notched side of the tool at the center of your chin
                  and sweep along your jawline toward your ears to define and
                  sculpt.
                </div>
                <div className="pl-4 border-l-2 border-gray200 text-sm sm:text-base text-gray400">
                  <strong className="text-gray500 font-medium">Cheeks:</strong>{" "}
                  Using the flat side, move the tool from the side of your nose
                  toward your temples to lift and depuff.
                </div>
                <div className="pl-4 border-l-2 border-gray200 text-sm sm:text-base text-gray400">
                  <strong className="text-gray500 font-medium">
                    Under Eyes:
                  </strong>{" "}
                  With the smaller edge, gently glide from the inner corner of
                  your eye outward toward your temple. Be extra delicate in this
                  sensitive area.
                </div>
                <div className="pl-4 border-l-2 border-gray200 text-sm sm:text-base text-gray400">
                  <strong className="text-gray500 font-medium">
                    Forehead:
                  </strong>{" "}
                  Start at the center of your forehead and stroke outward toward
                  your hairline to smooth and relax the skin.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-medium text-gray500 tracking-wide pb-1">
                Step 3: Clean Your Tool
              </h3>
              <p className="text-sm sm:text-base text-gray400">
                After each use, wash your Gua Sha with mild soap and water. Pat
                dry with a clean towel.
              </p>
            </div>

            {/* Benefits Section */}
            <div className="space-y-3 pt-4 border-t border-gray200">
              <h3 className="text-xl sm:text-2xl font-medium text-gray500 tracking-wide pb-1">
                The Benefits of Gua Sha For Skin Health
              </h3>
              <p className="text-sm sm:text-base text-gray400">
                Incorporating gua sha into your skincare routine can:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm sm:text-base text-gray400">
                <li>Improve circulation and skin vitality.</li>
                <li>Enhance product absorption for deeper hydration.</li>
                <li>Reduce puffiness and sculpt facial contours.</li>
                <li>Relieve muscle tension for a more relaxed appearance.</li>
              </ul>
              <p className="text-sm sm:text-base text-gray400 pt-2">
                By using the Blue Lagoon Skincare Gua Sha Tool consistently, you
                can unlock radiant, healthy-looking skin while indulging in a
                luxurious self-care ritual.
              </p>
            </div>
          </div>

          {/* ===== Videos & Carousel Grid at Bottom ===== */}
          <div className="mt-14 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {/* 4 Video Items */}
              {videos.map((vid, index) => (
                <div
                  key={vid.id}
                  onClick={() => openModalAt(index)}
                  className="group relative flex flex-col bg-white border border-gray200 p-3 sm:p-4 h-full shadow-xs cursor-pointer hover:border-gray400 transition-all duration-200"
                  role="button"
                  tabIndex={0}
                  aria-label={`Preview ${vid.title}`}
                >
                  <div className={styles.videoWrapper}>
                    <video
                      src={vid.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      aria-label={vid.title}
                    />
                    {/* Hover expand overlay */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="bg-white/95 text-gray800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs tracking-wider uppercase">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-3.5"
                        >
                          <path d="M15 3h6v6" />
                          <path d="M9 21H3v-6" />
                          <path d="M21 3l-7 7" />
                          <path d="M3 21l7-7" />
                        </svg>
                        Full Preview
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* 5th Item: shadcn Carousel Component with /slider images */}
              <div
                className="group relative flex flex-col bg-white border border-gray200 p-3 sm:p-4 h-full shadow-xs cursor-pointer hover:border-gray400 transition-all duration-200"
                onClick={() => openModalAt(4)}
                role="button"
                tabIndex={0}
                aria-label="Preview Ritual Slider Images"
              >
                <div className={styles.carouselWrapper}>
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    plugins={[
                      Autoplay({
                        delay: 3500,
                        stopOnInteraction: false,
                      }),
                    ]}
                    className="w-full h-full"
                  >
                    <CarouselContent className="h-full -ml-0">
                      {sliderImages.map((img) => (
                        <CarouselItem
                          key={img.id}
                          className="relative w-full h-full pl-0 min-w-full"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt || ""}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                            className="w-full h-full object-cover"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                  {/* Hover expand overlay */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                    <span className="bg-white/95 text-gray800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs tracking-wider uppercase">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-3.5"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M9 21H3v-6" />
                        <path d="M21 3l-7 7" />
                        <path d="M3 21l7-7" />
                      </svg>
                      Full Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Full Preview Dialog / Modal with Carousel ===== */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          {/* Backdrop Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.modalOverlay} />
          </Transition.Child>

          {/* Modal Container */}
          <div className={styles.modalContainer}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={styles.modalPanel}>
                {/* Modal Header */}
                <div className={styles.modalHeader}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <Dialog.Title className="text-base sm:text-lg font-medium text-white tracking-wide">
                      {allMediaItems[currentModalSlide]?.title}
                    </Dialog.Title>
                    <span className="text-xs text-gray400">
                      ({currentModalSlide + 1} / {allMediaItems.length})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-1.5 text-gray300 hover:text-white hover:bg-gray-700 rounded-full transition-colors focus:outline-none"
                    aria-label="Close dialog"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Body: shadcn Carousel */}
                <div className={styles.modalBody}>
                  <Carousel
                    setApi={setModalApi}
                    opts={{
                      align: "center",
                      loop: true,
                      startIndex: selectedIndex,
                    }}
                    className="w-full h-full"
                  >
                    <CarouselContent className="h-full -ml-0">
                      {allMediaItems.map((item, idx) => (
                        <CarouselItem
                          key={item.id}
                          className="relative w-full h-full pl-0 min-w-full flex items-center justify-center"
                        >
                          <div className={styles.modalSlideMedia}>
                            {item.type === "video" ? (
                              <video
                                key={item.src}
                                src={item.src}
                                controls
                                autoPlay={currentModalSlide === idx}
                                playsInline
                                className="w-full h-full object-contain rounded-md"
                                aria-label={item.title}
                              />
                            ) : (
                              <Image
                                src={item.src}
                                alt={item.alt || item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 800px"
                                className="object-contain rounded-md"
                                priority={Math.abs(currentModalSlide - idx) <= 1}
                              />
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 sm:left-4 bg-black/60 hover:bg-black text-white" />
                    <CarouselNext className="right-2 sm:right-4 bg-black/60 hover:bg-black text-white" />
                  </Carousel>
                </div>

                {/* Modal Footer: Quick Jump Dot Indicators */}
                <div className={styles.modalFooter}>
                  {allMediaItems.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => modalApi?.scrollTo(idx)}
                      className={`${styles.dotIndicator} ${
                        currentModalSlide === idx
                          ? "bg-white scale-125"
                          : "bg-gray-600 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                    />
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HowToUse;
