"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import FacebookLogo from "../../public/icons/FacebookLogo";
import InstagramLogo from "../../public/icons/InstagramLogo";
import TiktokLogo from "../../public/icons/TiktokLogo";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("Navigation");

  return (
    <>
      <div className={styles.footerContainer}>
        <div className={`app-max-width app-x-padding ${styles.footerContents}`}>
          <div>
            <h3 className={styles.footerHead}>{t("company")}</h3>
            <div className={styles.column}>
              <a href="/coming-soon">{t("about_us")}</a>
              <a href="/coming-soon">{t("contact_us")}</a>
              <a href="/coming-soon">{t("store_location")}</a>
              <a href="/coming-soon">{t("careers")}</a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>{t("help")}</h3>
            <div className={styles.column}>
              <a href="/coming-soon">{t("order_tracking")}</a>
              <a href="/coming-soon">{t("faqs")}</a>
              <a href="/coming-soon">{t("privacy_policy")}</a>
              <a href="/coming-soon">{t("terms_conditions")}</a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>{t("store")}</h3>
            <div className={styles.column}>
              <Link href="/products/1">The Gua Sha Tool</Link>
              <Link href="/#how-to-use">How To Use</Link>
              <Link href="/shopping-cart">Shopping Cart</Link>
              <Link href="/wishlist">Wishlist</Link>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>{t("keep_in_touch")}</h3>
            <div className={styles.column}>
              <span>
                {t("address.detail")}
                <br />
                {t("address.road")}
                <br />
                {t("address.city")}
              </span>
              <span>{t("phone_number")}</span>
              <span>
                {t("open_all_days")} <br />- {t("opening_hours")}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center pt-12">
          <span className="text-xl mb-4">{t("newsletter")}</span>
          <span className="text-gray400 text-sm mb-6 text-center">
            {t("newsletter_desc")}
          </span>
          <div className="flex w-11/12 md:w-3/5 lg:w-2/5">
            <Input
              type="text"
              name="newsletter"
              placeholder={t("email_address")}
              extraClass="bg-white"
            />
            <Button
              size="sm"
              value={t("send")}
              extraClass="ml-2 uppercase tracking-wider"
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className="app-max-width app-x-padding w-full flex justify-between items-center">
          <span className="">@2026 Haru. {t("all_rights_reserved")}</span>
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
