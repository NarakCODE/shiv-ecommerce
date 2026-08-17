"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Others");
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-2xl">{t("page_not_found")}</h1>
      <Image
        src="/bg-img/404.svg"
        alt="404 Page Not Found"
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
