"use client";

import Image from "next/image";

// swiperjs
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

type Slider = {
  id: number;
  image: string;
  alt: string;
};

const sliders: Slider[] = [
  {
    id: 1,
    image: "/bg-img/banner-1.png",
    alt: "Haru Fashion promo banner 1",
  },
  {
    id: 2,
    image: "/bg-img/banner-2.jpeg",
    alt: "Haru Fashion promo banner 2",
  },
  {
    id: 3,
    image: "/bg-img/banner-3.png",
    alt: "Haru Fashion promo banner 3",
  },
  {
    id: 4,
    image: "/bg-img/banner-4.jpeg",
    alt: "Haru Fashion promo banner 4",
  },
];

const Slideshow = () => {
  return (
    <>
      <div className="relative -top-20 slide-container w-full aspect-square lg:aspect-auto lg:h-screen lg:h-dvh z-20 overflow-hidden bg-white">
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
          className="mySwiper w-full h-full"
        >
          {sliders.map((slider) => (
            <SwiperSlide key={slider.id} className="w-full h-full">
              <div className="relative w-full h-full overflow-hidden bg-[#fafaf9]">
                <Image
                  src={slider.image}
                  alt={slider.alt}
                  fill
                  priority={slider.id === 1}
                  sizes="100vw"
                  className="object-cover object-center w-full h-full"
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
