import React from "react";
import { useTranslations } from "next-intl";

import InstagramLogo from "../../public/icons/InstagramLogo";
import FacebookLogo from "../../public/icons/FacebookLogo";
import TiktokLogo from "../../public/icons/TiktokLogo";
import styles from "./Header.module.css";

const TopNav = () => {
  const t = useTranslations("Navigation");

  return (
    <div className="bg-gray500 text-gray100 hidden lg:block">
      <div className="flex justify-between app-max-width">
        <ul className={`flex items-center ${styles.topLeftMenu}`}>
          <li>
            <a
              href="https://www.facebook.com/chii.shiv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="hover:text-gray-300 transition-colors"
            >
              <FacebookLogo />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/shiv_chii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Account"
              className="hover:text-gray-300 transition-colors"
            >
              <InstagramLogo />
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@chiishiv09?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Profile"
              className="hover:text-gray-300 transition-colors"
            >
              <TiktokLogo />
            </a>
          </li>
          <li>
            <a href="/coming-soon">{t("about_us")}</a>
          </li>
          <li>
            <a href="/coming-soon">{t("our_policy")}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;

