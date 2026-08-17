"use client";

import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Head Section ===== */}
      <Header title="Checkout - Haru Fashion" />

      <main id="main-content" className="flex-1 flex items-center justify-center">
        <div className="app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100 py-20 flex flex-col items-center justify-center text-center">
          <div className="max-w-md mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-gray400 font-semibold block">
              Notice
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium text-gray500 tracking-wide">
              Checkout is Temporarily Disabled
            </h1>
            <p className="text-sm text-gray400 leading-relaxed">
              Online checkout is currently paused while we update our system. Please check back soon or explore our product ritual guide.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-gray500 hover:bg-gray800 text-white text-xs uppercase tracking-widest font-semibold transition-colors text-center"
              >
                Return to Home
              </Link>
              <Link
                href="/shopping-cart"
                className="px-6 py-3 border border-gray500 text-gray500 hover:bg-gray500 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors text-center"
              >
                View Shopping Bag
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ===== Footer Section ===== */}
      <Footer />
    </div>
  );
}
