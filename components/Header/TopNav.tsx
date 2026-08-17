"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

import InstagramLogo from "../../public/icons/InstagramLogo";
import FacebookLogo from "../../public/icons/FacebookLogo";
import DownArrow from "../../public/icons/DownArrow";
import styles from "./Header.module.css";

const TopNav = () => {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const [currentLocale, setCurrentLocale] = useState<string>("en");

  useEffect(() => {
    const saved = getCookie("NEXT_LOCALE");
    if (saved && (saved === "en" || saved === "my")) {
      setCurrentLocale(saved as string);
    }
  }, []);

  const changeLocale = (newLocale: "en" | "my") => {
    setCookie("NEXT_LOCALE", newLocale, { maxAge: 60 * 60 * 24 * 365 });
    setCurrentLocale(newLocale);
    window.location.reload();
  };

  return (
    <div className="bg-gray500 text-gray100 hidden lg:block">
      <div className="flex justify-between app-max-width">
        <ul className={`flex ${styles.topLeftMenu}`}>
          <li>
            <a href="#" aria-label="Haru Fashion Facebook Page">
              <FacebookLogo />
            </a>
          </li>
          <li>
            <a href="#" aria-label="Haru Fashion Instagram Account">
              <InstagramLogo />
            </a>
          </li>
          <li>
            <a href="#">{t("about_us")}</a>
          </li>
          <li>
            <a href="#">{t("our_policy")}</a>
          </li>
        </ul>
        <ul className={`flex ${styles.topRightMenu}`}>
          <li>
            <Menu as="div" className="relative">
              <Menu.Button as="button" className="flex items-center">
                {currentLocale === "en" ? t("eng") : t("myn")} <DownArrow />
              </Menu.Button>
              <Menu.Items
                className="flex flex-col w-20 right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none"
                style={{ zIndex: 9999 }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => changeLocale("en")}
                      className={`py-2 px-4 text-center text-sm ${
                        active || currentLocale === "en"
                          ? "bg-gray200 text-gray500"
                          : "bg-white text-gray500"
                      }`}
                    >
                      {t("eng")}
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => changeLocale("my")}
                      className={`py-2 px-4 text-center text-sm ${
                        active || currentLocale === "my"
                          ? "bg-gray200 text-gray500"
                          : "bg-white text-gray500"
                      }`}
                    >
                      {t("myn")}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </li>
          <li>
            <Menu as="div" className="relative">
              <Menu.Button as="button" className="flex items-center">
                {t("usd")} <DownArrow />
              </Menu.Button>
              <Menu.Items
                className="flex flex-col w-20 right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none"
                style={{ zIndex: 9999 }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active
                          ? "bg-gray100 text-gray500"
                          : "bg-white text-gray500"
                      } py-2 px-4 text-center focus:outline-none text-sm`}
                    >
                      {t("usd")}
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active
                          ? "bg-gray100 text-gray500"
                          : "bg-white text-gray500"
                      } py-2 px-4 text-center focus:outline-none text-sm`}
                    >
                      {t("mmk")}
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;
