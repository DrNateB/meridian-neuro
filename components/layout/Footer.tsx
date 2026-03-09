"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/access", label: "Access" },
  { href: "/grants", label: "Grants" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Column 1 — Logo + tagline */}
          <div>
            {logoError ? (
              <span className="text-xl font-bold tracking-tight">
                MERIDIAN NEURO
              </span>
            ) : (
              <span className="inline-block rounded-lg bg-white px-4 py-2">
                <Image
                  src="/logo.png"
                  alt="Meridian Neuro"
                  width={240}
                  height={60}
                  style={{ height: "52px", width: "auto" }}
                  onError={() => setLogoError(true)}
                />
              </span>
            )}
            <p className="mt-3 text-sm font-medium text-white/90">
              Setting the standard. Expanding the reach.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Meridian Neuro Foundation advances evidence-based neurotherapy
              through rigorous research, expanded access to care, and grant
              funding for practitioners and communities in need.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li>
                <a
                  href="mailto:info@meridianneuro.org"
                  className="transition-colors hover:text-white"
                >
                  info@meridianneuro.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 md:px-12">
          <p className="text-center text-xs text-white/50">
            &copy; {new Date().getFullYear()} Meridian Neuro Foundation
          </p>
          <p className="mt-1 text-center text-xs text-white/50">
            Meridian Foundation for Neurotherapy, operating as Meridian Neuro
            Foundation | 501(c)(3) Nonprofit | EIN: Pending
          </p>
        </div>
      </div>
    </footer>
  );
}
