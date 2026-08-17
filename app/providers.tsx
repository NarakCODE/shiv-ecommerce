"use client";

import React, { useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getCookie } from "cookies-next";

import { ProvideCart } from "../context/cart/CartProvider";
import { ProvideWishlist } from "../context/wishlist/WishlistProvider";
import { ProvideAuth } from "../context/AuthContext";

import enMessages from "../messages/common/en.json";
import myMessages from "../messages/common/my.json";

const messagesMap: Record<string, any> = {
  en: enMessages,
  my: myMessages,
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const savedLocale = getCookie("NEXT_LOCALE");
    if (savedLocale && (savedLocale === "en" || savedLocale === "my")) {
      setLocale(savedLocale as string);
    }

    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "development") {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }
    }
  }, []);

  const messages = messagesMap[locale] || enMessages;

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone="UTC"
    >
      <ProvideAuth>
        <ProvideWishlist>
          <ProvideCart>{children}</ProvideCart>
        </ProvideWishlist>
      </ProvideAuth>
    </NextIntlClientProvider>
  );
}
