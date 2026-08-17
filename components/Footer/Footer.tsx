"use client";

import { useTranslations } from "next-intl";

import FacebookLogo from "../../public/icons/FacebookLogo";
import InstagramLogo from "../../public/icons/InstagramLogo";
import TiktokLogo from "../../public/icons/TiktokLogo";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import styles from "./Footer.module.css";
import { HugeiconsIcon } from "@hugeicons/react";
import { Call02Icon } from "@hugeicons/core-free-icons";

export default function Footer() {
  const t = useTranslations("Navigation");

  return (
    <>
      <div className={styles.footerContainer}>
        <div className="w-full flex flex-col items-center justify-center">
          <span className="text-xl mb-3 text-center">{t("newsletter")}</span>
          <span className="text-gray400 text-sm mb-6 text-center max-w-md px-4">
            {t("newsletter_desc")}
          </span>
          <div className="flex flex-col sm:flex-row w-11/12 max-w-md gap-2 justify-center items-center">
            <Input
              type="text"
              name="newsletter"
              placeholder={t("email_address")}
              extraClass="bg-white w-full text-center sm:text-left focus:border-black"
            />
            <Button
              size="sm"
              value={t("send")}
              extraClass="w-full sm:w-auto uppercase tracking-wider px-6 py-2.5 whitespace-nowrap"
            />
          </div>

          {/* ===== Customer Service / Contact Info ===== */}
          <div className="mt-8 pt-6 border-t border-gray200/80 w-11/12 md:w-3/5 lg:w-2/5 text-center flex flex-col items-center justify-center space-y-1.5">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Call02Icon} className="size-4 text-gray400" />
              <a
                href="tel:0883979971"
                className="text-base font-semibold text-gray500 hover:text-black transition-colors tracking-wide"
              >
                Tell: 0883979971
              </a>
            </div>
            <p className="text-xs sm:text-sm text-gray400 font-normal leading-relaxed">
              តបតែតាម fb និង IG ជាមួយ Telegram ណាបងៗ
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className="app-max-width app-x-padding w-full flex justify-between items-center">
          <span className="">@2026 Shiv. {t("all_rights_reserved")}</span>
          <span className="flex items-center space-x-3">
            <span className="hidden sm:block mr-1">
              {t("follow_us_on_social_media")}:
            </span>{" "}
            <a
              href="https://www.facebook.com/chii.shiv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="hover:text-gray-300 transition-colors"
            >
              <FacebookLogo />
            </a>
            <a
              href="https://www.instagram.com/shiv_chii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Account"
              className="hover:text-gray-300 transition-colors"
            >
              <InstagramLogo />
            </a>
            <a
              href="https://www.tiktok.com/@chiishiv09?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Profile"
              className="hover:text-gray-300 transition-colors"
            >
              <TiktokLogo />
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
