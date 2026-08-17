"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogBackdrop, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

import MenuIcon from "../../public/icons/MenuIcon";
import WhistlistIcon from "../../public/icons/WhistlistIcon";
import InstagramLogo from "../../public/icons/InstagramLogo";
import FacebookLogo from "../../public/icons/FacebookLogo";
import TiktokLogo from "../../public/icons/TiktokLogo";
import { useWishlist } from "../../context/wishlist/WishlistProvider";

export default function Menu() {
  const t = useTranslations("Navigation");
  const { wishlist } = useWishlist();
  const [open, setOpen] = useState(false);

  // Calculate Number of Wishlist
  let noOfWishlist = wishlist.length;

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
          aria-label="Hamburger Menu"
          onClick={openModal}
          className="focus:outline-none"
        >
          <MenuIcon />
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          style={{ zIndex: 99999 }}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen">
            <Transition.Child as={Fragment}>
              <DialogBackdrop className="fixed inset-0 bg-gray500 opacity-50" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-linear duration-600"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-linear duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div
                style={{ height: "100vh" }}
                className="relative opacity-95 overflow-y-auto inline-block dur h-screen w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl"
              >
                <div className="flex justify-between items-center p-6 pb-0">
                  <Link href="/">
                    <Image
                      className="justify-center"
                      src="/logo.svg"
                      alt="Shiv Logo"
                      width={110}
                      height={28}
                    />
                  </Link>
                  <button
                    type="button"
                    className="outline-none focus:outline-none text-3xl sm:text-2xl"
                    onClick={closeModal}
                  >
                    &#10005;
                  </button>
                </div>

                <div className="mb-10">
                  <div className="itemContainer px-6 w-full flex flex-col justify-around items-center pt-6">
                    <Link
                      href="/products/1"
                      className="w-full text-xl hover:bg-gray100 text-left py-2"
                      onClick={closeModal}
                    >
                      The Gua Sha Tool
                    </Link>
                    <Link
                      href="/#how-to-use"
                      className="w-full text-xl hover:bg-gray100 text-left py-2"
                      onClick={closeModal}
                    >
                      How To Use
                    </Link>
                    <Link
                      href="/#testimonials"
                      className="w-full text-xl hover:bg-gray100 text-left py-2"
                      onClick={closeModal}
                    >
                      Reviews
                    </Link>
                    <Link
                      href="/coming-soon"
                      className="w-full text-xl hover:bg-gray100 text-left py-2"
                      onClick={closeModal}
                    >
                      {t("about_us")}
                    </Link>
                    <Link
                      href="/coming-soon"
                      className="w-full text-xl hover:bg-gray100 text-left py-2"
                      onClick={closeModal}
                    >
                      {t("contact_us")}
                    </Link>
                    <hr className="border border-gray300 w-full mt-2" />
                    <Link
                      href="/wishlist"
                      className="text-xl py-2 my-3 w-full flex justify-between"
                      onClick={closeModal}
                    >
                      <span>{t("wishlist")}</span>
                      <div className="relative">
                        <WhistlistIcon />
                        {noOfWishlist > 0 && (
                          <span
                            className={`absolute text-xs -top-0 -left-7 bg-gray500 text-gray100 py-1 px-2 rounded-full`}
                          >
                            {noOfWishlist}
                          </span>
                        )}
                      </div>
                    </Link>
                    <hr className="border border-gray300 w-full" />

                    <div className="flex my-8 w-3/5 space-x-6 justify-center items-center">
                      <a
                        href="https://www.facebook.com/chii.shiv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray400 hover:text-gray500 w-10 h-10 py-1 flex justify-center items-center rounded-md active:bg-gray300 transition-colors"
                        aria-label="Facebook Page"
                      >
                        <FacebookLogo extraClass="h-6" />
                      </a>
                      <a
                        href="https://www.instagram.com/shiv_chii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray400 hover:text-gray500 w-10 h-10 py-1 flex justify-center items-center rounded-md active:bg-gray300 transition-colors"
                        aria-label="Instagram Account"
                      >
                        <InstagramLogo extraClass="h-6" />
                      </a>
                      <a
                        href="https://www.tiktok.com/@chiishiv09?is_from_webapp=1&sender_device=pc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray400 hover:text-gray500 w-10 h-10 py-1 flex justify-center items-center rounded-md active:bg-gray300 transition-colors"
                        aria-label="TikTok Profile"
                      >
                        <TiktokLogo extraClass="h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

