"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ComingSoonPage() {
  const t = useTranslations("Others");
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl tracking-wider leading-10">
        {t("coming_soon")}
      </h1>
      <h2 className="text-2xl text-gray500 mt-2">
        {t("page_not_created_msg")}
      </h2>
      <Image
        src="/bg-img/coding.svg"
        alt="Not created yet"
        width={400}
        height={300}
      />
      <span className="text-gray400">
        {t("go_back_to")}{" "}
        <Link href="/" className="underline font-bold hover:text-gray500">
          home page
        </Link>
        ?
      </span>
    </div>
  );
}
