"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import styles from "./HowToUse.module.css";

type Props = {
  extraClass?: string;
};

const videos = [
  {
    id: 1,
    title: "Technique 1",
    src: "/videos/how-to-use-1.mp4",
  },
  {
    id: 2,
    title: "Technique 2",
    src: "/videos/how-to-use-2.mp4",
  },
  {
    id: 3,
    title: "Technique 3",
    src: "/videos/how-to-use-3.mp4",
  },
  {
    id: 4,
    title: "Technique 4",
    src: "/videos/how-to-use-4.mp4",
  },
];

const sliderImages = [
  { id: 1, src: "/slider/slider-1.jpg", alt: "Gua Sha Ritual Slide 1" },
  { id: 2, src: "/slider/slider-2.jpg", alt: "Gua Sha Ritual Slide 2" },
  { id: 3, src: "/slider/slider-3.jpg", alt: "Gua Sha Ritual Slide 3" },
  { id: 4, src: "/slider/slider-4.jpg", alt: "Gua Sha Ritual Slide 4" },
  { id: 5, src: "/slider/slider-5.jpg", alt: "Gua Sha Ritual Slide 5" },
  { id: 6, src: "/slider/slider-6.jpg", alt: "Gua Sha Ritual Slide 6" },
];

const HowToUse: React.FC<Props> = ({ extraClass = "" }) => {
  return (
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
              Proper preparation is key to ensure the tool glides smoothly across
              your skin. Start with a freshly cleansed face, then apply either:
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
              For each step, use three to five strokes, always moving upward and
              outward to promote lymphatic drainage and lifting effects. Hold the
              gua sha tool at a 30-45 degree angle and apply gentle pressure.
            </p>
            <div className="space-y-3 pt-1">
              <div className="pl-4 border-l-2 border-gray200 text-sm sm:text-base text-gray400">
                <strong className="text-gray500 font-medium">Neck:</strong>{" "}
                Start at the base of your neck and glide the flat side upward
                toward your jawline. This motion helps stimulate lymphatic
                drainage and reduce tension.
              </div>
              <div className="pl-4 border-l-2 border-gray200 text-sm sm:text-base text-gray400">
                <strong className="text-gray500 font-medium">Jawline:</strong>{" "}
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
                With the smaller edge, gently glide from the inner corner of your
                eye outward toward your temple. Be extra delicate in this
                sensitive area.
              </div>
              <div className="pl-4 border-l-2 border-gray200 text-sm sm:text-base text-gray400">
                <strong className="text-gray500 font-medium">Forehead:</strong>{" "}
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
              After each use, wash your Gua Sha with mild soap and water. Pat dry
              with a clean towel.
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
            {/* Video Items */}
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="flex flex-col bg-white border border-gray200 p-3 sm:p-4 h-full shadow-xs"
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
                </div>
              </div>
            ))}

            {/* Last Item: Carousel Component with /slider images */}
            <div className="flex flex-col bg-white border border-gray200 p-3 sm:p-4 h-full shadow-xs">
              <div className={styles.carouselWrapper}>
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  slidesPerView={1}
                  spaceBetween={0}
                  loop={true}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  className={styles.sliderSwiper}
                >
                  {sliderImages.map((img) => (
                    <SwiperSlide key={img.id} className="relative w-full h-full">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
