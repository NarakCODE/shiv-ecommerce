"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
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
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  CheckmarkBadge01Icon,
} from "@hugeicons/core-free-icons";

export type StorySlide = {
  id: string;
  mediaType?: "image" | "video";
  image?: string;
  videoSrc?: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
    location?: string;
  };
  timeAgo?: string;
};

export type StoryHighlight = {
  id: string;
  title: string;
  coverImage: string;
  stories: StorySlide[];
};

// Default Highlight Data — Ready to plug in your custom photos and videos!
export const HIGHLIGHTS_DATA: StoryHighlight[] = [
  {
    id: "hl-1",
    title: "Real Results ✨",
    coverImage: "/testimonials/ritual-1.jpg",
    stories: [
      {
        id: "s1-1",
        mediaType: "image",
        image: "/testimonials/ritual-1.jpg",
        user: {
          name: "Elena Rostova",
          handle: "elena.skincare",
          avatar: "/testimonials/avatar-1.jpg",
          verified: true,
        },
      },
      {
        id: "s1-2",
        mediaType: "video",
        videoSrc: "/videos/how-to-use-1.mp4",
        user: {
          name: "Sophia Lindqvist",
          handle: "sophia.glow",
          avatar: "/testimonials/avatar-1.jpg",
          verified: true,
        },
      },
    ],
  },
  {
    id: "hl-2",
    title: "Daily Ritual 🤍",
    coverImage: "/testimonials/avatar-1.jpg",
    stories: [
      {
        id: "s2-1",
        mediaType: "image",
        image: "/testimonials/avatar-1.jpg",
        user: {
          name: "Chloe Mercer",
          handle: "chloe.mercer",
          avatar: "/slider/slider-1.jpg",
          verified: true,
        },
      },
    ],
  },
  {
    id: "hl-3",
    title: "Glow & Lift 🌸",
    coverImage: "/slider/slider-2.jpg",
    stories: [
      {
        id: "s3-1",
        mediaType: "image",
        image: "/slider/slider-2.jpg",
        user: {
          name: "Anna Sigurd",
          handle: "anna.nordic",
          avatar: "/testimonials/avatar-1.jpg",
          verified: true,
        },
      },
    ],
  },
  {
    id: "hl-4",
    title: "Reviews ⭐",
    coverImage: "/products/gua-sha-2.webp",
    stories: [
      {
        id: "s4-1",
        mediaType: "image",
        image: "/products/gua-sha-2.webp",
        user: {
          name: "Marcus Vance",
          handle: "marcus.vance",
          avatar: "/slider/slider-1.jpg",
          verified: true,
        },
      },
    ],
  },
  {
    id: "hl-5",
    title: "Depuffing ❄️",
    coverImage: "/slider/slider-3.jpg",
    stories: [
      {
        id: "s5-1",
        mediaType: "image",
        image: "/slider/slider-3.jpg",
        user: {
          name: "Maya Chen",
          handle: "maya.skincare",
          avatar: "/testimonials/avatar-1.jpg",
          verified: true,
        },
      },
    ],
  },
  {
    id: "hl-6",
    title: "Unboxing 📦",
    coverImage: "/products/gua-sha-1.webp",
    stories: [
      {
        id: "s6-1",
        mediaType: "image",
        image: "/products/gua-sha-1.webp",
        user: {
          name: "Olivia Berg",
          handle: "olivia.beauty",
          avatar: "/slider/slider-1.jpg",
          verified: true,
        },
      },
    ],
  },
];

export default function TestiSlider() {
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number | null>(
    null
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const isStoryOpen = activeHighlightIndex !== null;
  const currentHighlight =
    activeHighlightIndex !== null ? HIGHLIGHTS_DATA[activeHighlightIndex] : null;
  const currentStories = currentHighlight?.stories || [];
  const currentSlide = currentStories[activeSlideIndex] || null;

  const openStory = (hlIndex: number) => {
    setActiveHighlightIndex(hlIndex);
    setActiveSlideIndex(0);
  };

  const closeStory = useCallback(() => {
    setActiveHighlightIndex(null);
    setActiveSlideIndex(0);
  }, []);

  const handleNextSlide = useCallback(() => {
    if (activeHighlightIndex === null) return;
    const highlight = HIGHLIGHTS_DATA[activeHighlightIndex];
    if (activeSlideIndex < highlight.stories.length - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    } else if (activeHighlightIndex < HIGHLIGHTS_DATA.length - 1) {
      setActiveHighlightIndex((prev) => prev! + 1);
      setActiveSlideIndex(0);
    } else {
      closeStory();
    }
  }, [activeHighlightIndex, activeSlideIndex, closeStory]);

  const handlePrevSlide = useCallback(() => {
    if (activeHighlightIndex === null) return;
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prev) => prev - 1);
    } else if (activeHighlightIndex > 0) {
      const prevHlIndex = activeHighlightIndex - 1;
      setActiveHighlightIndex(prevHlIndex);
      setActiveSlideIndex(HIGHLIGHTS_DATA[prevHlIndex].stories.length - 1);
    }
  }, [activeHighlightIndex, activeSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStoryOpen) return;
      if (e.key === "ArrowLeft") handlePrevSlide();
      if (e.key === "ArrowRight") handleNextSlide();
      if (e.key === "Escape") closeStory();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStoryOpen, handlePrevSlide, handleNextSlide, closeStory]);

  return (
    <div className="w-full max-w-5xl mx-auto my-6">
      {/* ===== IG Story Highlights Bar ===== */}
      <div className="flex items-center justify-start sm:justify-center gap-5 sm:gap-7 overflow-x-auto pb-4 pt-2 no-scrollbar px-2">
        {HIGHLIGHTS_DATA.map((hl, index) => (
          <button
            key={hl.id}
            type="button"
            onClick={() => openStory(index)}
            className="group flex flex-col items-center gap-2 focus:outline-none shrink-0 transition-transform active:scale-95"
            aria-label={`Open story highlight ${hl.title}`}
          >
            {/* Story Gradient Ring */}
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform duration-300 shadow-xs">
              <div className="p-0.5 bg-white rounded-full">
                <div className="relative size-16 sm:size-20 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={hl.coverImage}
                    alt={hl.title}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Story Label */}
            <span className="text-xs sm:text-xs font-medium text-gray500 tracking-tight text-center max-w-[84px] truncate group-hover:text-black">
              {hl.title}
            </span>
          </button>
        ))}
      </div>

      {/* Quick Instructional Hint */}
      <p className="text-center text-[11px] sm:text-xs text-gray400 mt-2 font-normal">
        Tap any highlight bubble above to view customer feedback &amp; skin stories
      </p>

      {/* ===== INSTAGRAM STORY VIEWER DIALOG ===== */}
      <Dialog open={isStoryOpen} onOpenChange={(open) => !open && closeStory()}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen h-dvh max-w-none sm:max-w-none rounded-none border-none bg-black/90 p-0 gap-0 overflow-hidden flex items-center justify-center ring-0 z-50"
        >
          {/* Screen Reader Header */}
          <DialogHeader className="sr-only">
            <DialogTitle>
              {currentHighlight?.title} - {currentSlide?.user.name} Story
            </DialogTitle>
            <DialogDescription>
              Instagram story highlight testimonial from @{currentSlide?.user.handle}
            </DialogDescription>
          </DialogHeader>

          {/* Close Button Top Right */}
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 sm:top-6 sm:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-40 size-10 sm:size-11 cursor-pointer transition-all"
              />
            }
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
            <span className="sr-only">Close story</span>
          </DialogClose>

          {/* Previous Story Arrow Button (Desktop Floating) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevSlide}
            aria-label="Previous story"
            className="hidden sm:flex absolute left-4 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-40 size-12 cursor-pointer transition-all"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-6" />
          </Button>

          {/* Next Story Arrow Button (Desktop Floating) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextSlide}
            aria-label="Next story"
            className="hidden sm:flex absolute right-4 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-40 size-12 cursor-pointer transition-all"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-6" />
          </Button>

          {/* Story Card Chassis (9:16 Instagram Aspect Ratio) */}
          {currentSlide && (
            <div className="relative w-full max-w-[390px] h-full sm:h-[84vh] sm:max-h-[760px] sm:rounded-2xl overflow-hidden bg-gray950 shadow-2xl flex flex-col justify-between select-none">
              
              {/* Story Media Background (Image or Video) */}
              <div className="absolute inset-0 z-0 bg-black">
                {currentSlide.mediaType === "video" && currentSlide.videoSrc ? (
                  <video
                    key={currentSlide.videoSrc}
                    src={currentSlide.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                    aria-label={currentSlide.user.name}
                  />
                ) : (
                  <Image
                    src={
                      currentSlide.image ||
                      currentHighlight?.coverImage ||
                      "/testimonials/ritual-1.jpg"
                    }
                    alt={currentSlide.user.name}
                    fill
                    sizes="400px"
                    priority
                    className="object-cover object-center"
                  />
                )}
                {/* Story Top & Bottom Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
              </div>

              {/* Tap Left / Right Areas for Mobile Navigation */}
              <div
                onClick={handlePrevSlide}
                className="absolute inset-y-0 left-0 w-1/3 z-20 cursor-pointer"
                aria-label="Previous story slide"
              />
              <div
                onClick={handleNextSlide}
                className="absolute inset-y-0 right-0 w-2/3 z-20 cursor-pointer"
                aria-label="Next story slide"
              />

              {/* Top Header & Segmented Progress Bars */}
              <div className="relative z-30 p-3 sm:p-4 space-y-2.5">
                {/* Segmented Story Progress Bar */}
                <div className="flex items-center gap-1 w-full">
                  {currentStories.map((_, sIdx) => (
                    <div
                      key={sIdx}
                      className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden"
                    >
                      <div
                        className={`h-full bg-white transition-all duration-300 ${
                          sIdx < activeSlideIndex
                            ? "w-full"
                            : sIdx === activeSlideIndex
                            ? "w-full"
                            : "w-0"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* User Info Bar */}
                <div className="flex items-center gap-2.5">
                  <div className="relative size-9 rounded-full overflow-hidden border border-white/40 bg-white/10 shrink-0">
                    <Image
                      src={currentSlide.user.avatar}
                      alt={currentSlide.user.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-xs sm:text-sm font-semibold tracking-tight">
                        {currentSlide.user.name}
                      </span>
                      {currentSlide.user.verified && (
                        <HugeiconsIcon
                          icon={CheckmarkBadge01Icon}
                          className="size-3.5 text-sky-400 shrink-0"
                        />
                      )}
                    </div>
                    <p className="text-white/70 text-[11px] font-normal leading-none mt-0.5">
                      @{currentSlide.user.handle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Spacer (Keeps story clean and image focused) */}
              <div className="relative z-30 p-3 sm:p-4 pointer-events-none" />

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
