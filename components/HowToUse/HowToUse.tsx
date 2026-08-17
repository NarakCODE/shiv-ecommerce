import React, { useEffect, useState } from "react";
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
  PlayIcon,
} from "@hugeicons/core-free-icons";

import styles from "./HowToUse.module.css";

type Props = {
  extraClass?: string;
};

type VideoItem = {
  id: string;
  title: string;
  src: string;
};

const videos: VideoItem[] = [
  {
    id: "vid-1",
    title: "Technique 1: Neck & Lymphatic Drainage",
    src: "/videos/how-to-use-1.mp4",
  },
  {
    id: "vid-2",
    title: "Technique 2: Jawline Definition",
    src: "/videos/how-to-use-2.mp4",
  },
  {
    id: "vid-3",
    title: "Technique 3: Cheeks & Temples",
    src: "/videos/how-to-use-3.mp4",
  },
  {
    id: "vid-4",
    title: "Technique 4: Eyes & Forehead",
    src: "/videos/how-to-use-4.mp4",
  },
];

const ritualTips = [
  {
    step: "01",
    title: "Prepare with Slip",
    desc: "Always apply 3-5 drops of BL+ Serum or Face Oil before gliding to ensure effortless movement without skin friction.",
    tag: "Preparation",
  },
  {
    step: "02",
    title: "Flat 15°–45° Angle",
    desc: "Keep the porcelain tool almost flat against your skin. Never hold it perpendicular at a sharp 90-degree angle.",
    tag: "Posture",
  },
  {
    step: "03",
    title: "Featherlight Pressure",
    desc: "Lymphatic vessels are right beneath the surface. Use gentle upward and outward sweeps to stimulate natural flow.",
    tag: "Technique",
  },
  {
    step: "04",
    title: "Chill for Maximum Depuff",
    desc: "Store in the refrigerator for 10 minutes prior to your morning ritual for enhanced cooling and redness relief.",
    tag: "Pro Tip",
  },
];

const HowToUse: React.FC<Props> = ({ extraClass = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModalAt = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") prevVideo();
      if (e.key === "ArrowRight") nextVideo();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const activeVideo = videos[currentIndex];

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
              sizes="(max-width: 1296px) 100vw, 1296px"
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

          {/* ===== Visual Video Frames Grid with Ambient Background Styling ===== */}
          <div className="my-10 md:my-14 p-3 sm:p-7 md:p-9 rounded-xs bg-[#f8f9f7] border border-gray200/90 relative overflow-hidden shadow-xs">
            {/* Subtle background ambient glow */}
            <div className="absolute -top-24 -left-24 size-80 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 size-80 bg-stone-100/80 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 z-10">
              {videos.map((vid, index) => (
                <div
                  key={vid.id}
                  onClick={() => openModalAt(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModalAt(index);
                    }
                  }}
                  className="group relative bg-white p-1.5 sm:p-3 border border-gray200 shadow-xs hover:shadow-xl hover:border-gray400 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                  role="button"
                  tabIndex={0}
                  aria-label={`Preview ritual video ${index + 1}`}
                >
                  {/* Gallery Inner Frame Bezel */}
                  <div className="relative aspect-9/16 w-full overflow-hidden bg-black ring-1 ring-black/5">
                    <video
                      src={vid.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      aria-label={vid.title}
                    />

                    {/* Ambient Hover Shimmer / Glass Refraction */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Minimalist Floating Play Icon Trigger (Only visible on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="size-9 sm:size-11 rounded-full bg-white/90 group-hover:bg-white text-gray-900 group-hover:scale-110 shadow-md flex items-center justify-center backdrop-blur-xs transition-all duration-300">
                        <HugeiconsIcon
                          icon={PlayIcon}
                          className="size-4 sm:size-5 ml-0.5 text-gray-800"
                        />
                      </span>
                    </div>

                    {/* Minimal Corner Frame Accents */}
                    <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 size-2 sm:size-2.5 border-t border-l border-white/60 pointer-events-none group-hover:border-white transition-colors" />
                    <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 size-2 sm:size-2.5 border-t border-r border-white/60 pointer-events-none group-hover:border-white transition-colors" />
                    <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 size-2 sm:size-2.5 border-b border-l border-white/60 pointer-events-none group-hover:border-white transition-colors" />
                    <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 size-2 sm:size-2.5 border-b border-r border-white/60 pointer-events-none group-hover:border-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Addon Design Section: Pro Tips & Best Practices ===== */}
          <div className="mt-14 pt-12 border-t border-gray200">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-gray400 font-semibold block mb-1">
                Expert Guidelines
              </span>
              <h3 className="text-xl sm:text-2xl text-gray500 font-normal tracking-wide">
                4 Principles for Maximum Results
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ritualTips.map((tip) => (
                <div
                  key={tip.step}
                  className="p-5 bg-white border border-gray200 hover:border-gray400 transition-all duration-300 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray400">
                        {tip.step}
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-gray100 text-gray500">
                        {tip.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray500 mb-2">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-gray400 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FULL WEB PREVIEW DIALOG (SHADCN UI) ===== */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen h-dvh max-w-none sm:max-w-none rounded-none border-none bg-black/95 p-0 gap-0 overflow-hidden flex items-center justify-center ring-0"
        >
          {/* Accessible Hidden Header for Screen Readers */}
          <DialogHeader className="sr-only">
            <DialogTitle>{activeVideo.title}</DialogTitle>
            <DialogDescription>{activeVideo.title}</DialogDescription>
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

          {/* Previous Video Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevVideo}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-30 size-11 sm:size-12 cursor-pointer transition-all"
            aria-label="Previous video"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5 sm:size-6" />
          </Button>

          {/* Full Web Video Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <video
              key={activeVideo.src}
              src={activeVideo.src}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full max-h-screen max-h-dvh object-contain"
              aria-label={activeVideo.title}
            />
          </div>

          {/* Next Video Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={nextVideo}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-30 size-11 sm:size-12 cursor-pointer transition-all"
            aria-label="Next video"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-5 sm:size-6" />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HowToUse;

