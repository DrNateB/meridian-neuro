import type { Metadata } from "next";
import {
  FlaskConical,
  Globe,
  HeartHandshake,
  Mail,
} from "lucide-react";
import FadeInUp from "@/components/sections/FadeInUp";

export const metadata: Metadata = {
  title: "Contact | Meridian Neuro Foundation",
  description: "Get in touch with Meridian Neuro Foundation for research collaboration, community partnerships, grant inquiries, or general questions.",
};

const CONTACT_ITEMS = [
  {
    icon: FlaskConical,
    title: "Research Collaboration",
    email: "partnerships@meridianneuro.org",
  },
  {
    icon: Globe,
    title: "Community Partnerships",
    email: "partnerships@meridianneuro.org",
  },
  {
    icon: HeartHandshake,
    title: "Grant Inquiries",
    email: "grants@meridianneuro.org",
  },
  {
    icon: Mail,
    title: "General Inquiries",
    email: "info@meridianneuro.org",
  },
];

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="bg-cloud px-6 pb-20 pt-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Contact
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
          Let&rsquo;s talk.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">
          Whether you&rsquo;re interested in research collaboration, community
          partnership, grant funding, or general inquiries &mdash; we&rsquo;d
          love to hear from you.
        </p>
      </div>
    </section>
  );
}

/* ─── Contact Layout ─── */
function ContactLayout() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left — Intro */}
          <div>
            <h3 className="text-2xl font-bold text-navy">Get in touch</h3>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Reach out directly to the right team using the email addresses
              below. We&rsquo;ll respond as soon as possible.
            </p>
            <p className="mt-8 text-sm italic text-slate/60">
              Meridian Neuro Foundation is a 501(c)(3) nonprofit organization.
            </p>
          </div>

          {/* Right — Contact Cards */}
          <div className="flex flex-col gap-5">
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate/10 p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {item.title}
                    </p>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-sm text-teal hover:underline"
                    >
                      {item.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Footer Note ─── */
function FooterNote() {
  return (
    <section className="bg-cloud px-6 py-16 md:px-12">
      <FadeInUp className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Media & Press
        </p>
        <p className="text-base leading-relaxed text-slate">
          For media inquiries, please contact us at{" "}
          <a
            href="mailto:info@meridianneuro.org?subject=Press"
            className="text-teal hover:underline"
          >
            info@meridianneuro.org
          </a>{" "}
          with &ldquo;Press&rdquo; in the subject line.
        </p>

        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            Partnerships
          </p>
          <p className="text-base leading-relaxed text-slate">
            For research or community partnership inquiries, email{" "}
            <a
              href="mailto:partnerships@meridianneuro.org"
              className="text-teal hover:underline"
            >
              partnerships@meridianneuro.org
            </a>
          </p>
        </div>
      </FadeInUp>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero />
      <ContactLayout />
      <FooterNote />
    </>
  );
}
