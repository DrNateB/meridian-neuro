import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FlaskConical, Globe, HeartHandshake } from "lucide-react";
import FadeInUp from "@/components/sections/FadeInUp";
import ScrollIndicator from "@/components/sections/ScrollIndicator";
import CountUp from "@/components/sections/CountUp";
import { DONATE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Meridian Neuro Foundation | Setting the Standard. Expanding the Reach.",
  description: "Meridian Neuro Foundation advances neurotherapy through rigorous research, global standardization, and expanded access to evidence-based care for underserved communities worldwide.",
};

const PILLARS = [
  {
    icon: FlaskConical,
    title: "Research & Standards",
    body: "We establish rigorous scientific protocols, normative databases, and technical specifications that elevate neurotherapy practice worldwide.",
    href: "/research",
  },
  {
    icon: Globe,
    title: "Global Access",
    body: "We partner with communities worldwide to implement scalable, sustainable neurotherapy programs that reach underserved populations.",
    href: "/access",
  },
  {
    icon: HeartHandshake,
    title: "Direct Grants",
    body: "We provide financial assistance to individuals and organizations removing financial barriers to neurotherapy treatment.",
    href: "/grants",
  },
];

const STATS = [
  { value: "3", label: "Focus Countries (Growing)" },
  { value: "2025", label: "Launch Year" },
  { value: "501(c)(3)", label: "Nonprofit Status" },
  { value: "Global", label: "Research Reach" },
];

function MeridianLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M200 0 C220 200, 180 400, 210 600 C230 750, 190 850, 200 900"
          stroke="#2C7A7B"
          strokeWidth="1.5"
          opacity="0.06"
        />
        <path
          d="M500 0 C480 250, 520 450, 490 650 C470 780, 510 860, 500 900"
          stroke="#2C7A7B"
          strokeWidth="1.5"
          opacity="0.06"
        />
        <path
          d="M800 0 C830 180, 770 380, 810 580 C840 720, 780 840, 800 900"
          stroke="#2C7A7B"
          strokeWidth="1.5"
          opacity="0.06"
        />
        <path
          d="M1050 0 C1020 220, 1080 420, 1040 620 C1010 760, 1060 850, 1050 900"
          stroke="#2C7A7B"
          strokeWidth="1.5"
          opacity="0.06"
        />
      </svg>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-cloud px-6 pb-24 pt-32 md:px-12">
      <MeridianLines />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Image
          src="/favicon.png"
          alt="Meridian Neuro Foundation"
          width={425}
          height={438}
          className="mx-auto mb-6 h-[80px] w-auto"
          priority
        />
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          501(c)(3) Nonprofit Organization
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-7xl">
          Setting the Standard.
          <br />
          Expanding the Reach.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate md:text-xl">
          Meridian Neuro Foundation advances neurotherapy through rigorous
          research, global standardization, and expanded access to evidence-based
          care for underserved communities worldwide.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full border-2 border-teal px-6 py-3 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
          >
            Our Mission
          </Link>
          <Link
            href={DONATE_URL}
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Support Our Work
          </Link>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          What We Do
        </p>
        <h2 className="mx-auto mb-14 max-w-2xl text-center text-4xl font-bold text-navy">
          Two missions. One purpose.
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <FadeInUp key={pillar.title} delay={i * 0.1}>
              <div className="group cursor-pointer rounded-2xl border border-slate/10 border-t-4 border-t-teal bg-cloud p-8 transition-shadow hover:shadow-lg">
                <pillar.icon className="mb-5 h-8 w-8 text-teal" />
                <h3 className="mb-3 text-xl font-bold text-navy">
                  {pillar.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate">
                  {pillar.body}
                </p>
                <Link
                  href={pillar.href}
                  className="text-sm font-medium text-teal transition-colors hover:text-teal-light"
                >
                  Learn more &rarr;
                </Link>
              </div>
            </FadeInUp>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-navy px-6 py-20 md:px-12">
      <FadeInUp className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-gold md:text-4xl">
                {stat.value === "3" ? (
                  <CountUp target={3} />
                ) : stat.value === "2025" ? (
                  <CountUp target={2025} />
                ) : (
                  stat.value
                )}
              </p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm italic text-white/60">
          Building the foundation neurotherapy needs.
        </p>
      </FadeInUp>
    </section>
  );
}

function BrandStorySection() {
  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        {/* Pull quote */}
        <blockquote className="border-l-4 border-teal pl-6">
          <p className="text-lg leading-relaxed text-navy/80 md:text-xl">
            &ldquo;Neurotherapy has transformative potential&nbsp;&mdash; but the
            field lacks the scientific infrastructure it needs, and most people
            who could benefit never access care. We&rsquo;re solving both
            problems simultaneously.&rdquo;
          </p>
          <cite className="mt-4 block text-sm font-medium not-italic text-slate">
            &mdash; Meridian Neuro Foundation
          </cite>
        </blockquote>

        {/* Story */}
        <div>
          <h3 className="mb-4 text-2xl font-bold text-navy">
            Precision and compassion working together.
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-slate">
            Neurotherapy is one of the most promising frontiers in mental health
            and neurological care, yet the field suffers from fragmented
            standards, inconsistent training, and limited access&nbsp;&mdash;
            especially in communities that need it most.
          </p>
          <p className="mb-6 text-sm leading-relaxed text-slate">
            Meridian Neuro Foundation bridges that gap by pairing rigorous
            research with direct community impact, ensuring that advances in
            neurotherapy reach practitioners and patients everywhere.
          </p>
          <Link
            href="/about"
            className="text-sm font-medium text-teal transition-colors hover:text-teal-light"
          >
            Read our full story &rarr;
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-teal px-6 py-20 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to advance neurotherapy?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Partner with us, support our research, or help us expand access to
          care.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/get-involved"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-teal transition-opacity hover:opacity-90"
          >
            Get Involved
          </Link>
          <Link
            href={DONATE_URL}
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Donate
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <StatsSection />
      <BrandStorySection />
      <CtaBanner />
    </>
  );
}
