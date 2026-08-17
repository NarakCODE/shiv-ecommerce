import Image from "next/image";

const Slideshow = () => {
  return (
    <div className="relative -top-20 slide-container w-full z-20">
      <div className="hidden lg:block">
        <Image
          priority
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          src="/bg-img/banner-1.png"
          width={1672}
          height={941}
          alt="Haru Fashion promo banner"
        />
      </div>
      <div className="hidden sm:block lg:hidden">
        <Image
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          src="/bg-img/banner-1.png"
          width={820}
          height={462}
          alt="Haru Fashion promo banner"
        />
      </div>
      <div className="sm:hidden">
        <Image
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          src="/bg-img/banner-1.png"
          width={428}
          height={241}
          alt="Haru Fashion promo banner"
        />
      </div>
    </div>
  );
};

export default Slideshow;
