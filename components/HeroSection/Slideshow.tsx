"use client";

import Image from "next/image";

// swiperjs
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

type Slider = {
  id: number;
  image: string;
  width: number;
  height: number;
  widthTablet: number;
  heightTablet: number;
  widthMobile: number;
  heightMobile: number;
  alt: string;
};

const sliders: Slider[] = [
  {
    id: 1,
    image: "/bg-img/banner-1.png",
    width: 1672,
    height: 941,
    widthTablet: 820,
    heightTablet: 462,
    widthMobile: 428,
    heightMobile: 241,
    alt: "Haru Fashion promo banner",
  },
  {
    id: 2,
    image: "/bg-img/banner-2.jpeg",
    width: 1584,
    height: 672,
    widthTablet: 820,
    heightTablet: 348,
    widthMobile: 428,
    heightMobile: 182,
    alt: "Haru Fashion promo banner",
  },
];

const Slideshow = () => {
  return (
    <>
      <div className="relative -top-20 slide-container w-full z-20">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
            type: "fraction",
            dynamicBullets: true,
          }}
          className="mySwiper"
        >
          {sliders.map((slider) => (
            <SwiperSlide key={slider.id}>
              <div className="hidden lg:block">
                <Image
                  priority={slider.id === 1}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  src={slider.image}
                  width={slider.width}
                  height={slider.height}
                  alt={slider.alt}
                />
              </div>
              <div className="hidden sm:block lg:hidden">
                <Image
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  src={slider.image}
                  width={slider.widthTablet}
                  height={slider.heightTablet}
                  alt={slider.alt}
                />
              </div>
              <div className="sm:hidden">
                <Image
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  src={slider.image}
                  width={slider.widthMobile}
                  height={slider.heightMobile}
                  alt={slider.alt}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slideshow;
