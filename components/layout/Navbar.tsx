"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { DONATE_URL } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-12">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {logoError ? (
            <span className="text-xl font-bold tracking-tight text-navy">
              MERIDIAN NEURO
            </span>
          ) : (
            <Image
              src="/logo.png"
              alt="Meridian Neuro"
              width={884}
              height={384}
              style={{ height: "48px", width: "auto" }}
              priority
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "font-semibold text-teal"
                  : "text-slate hover:text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop donate button */}
        <div className="hidden md:block">
          <Link
            href={DONATE_URL}
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Donate
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate hover:text-navy md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={`rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                  pathname === link.href
                    ? "font-semibold text-teal"
                    : "text-slate"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={DONATE_URL}
              onClick={closeMobile}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
