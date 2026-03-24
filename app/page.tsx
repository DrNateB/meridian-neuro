import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, Globe, HeartHandshake } from "lucide-react";
import FadeInUp from "@/components/sections/FadeInUp";
import ScrollIndicator from "@/components/sections/ScrollIndicator";
import { DONATE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Meridian Foundation for Neurotherapy | Anchored in evidence. Global in reach.",
  description:
    "The Meridian Foundation for Neurotherapy advances neurotherapy through rigorous research, practitioner training, and expanded access to evidence-based care for underserved communities worldwide.",
};

const PILLARS = [
  {
    icon: FlaskConical,
    title: "Advancing the Science",
    body: "We support rigorous research in neurotherapy — developing the normative databases, clinical protocols, and technical standards that give the field the scientific foundation it needs to mature.",
  },
  {
    icon: Globe,
    title: "Empowering Practitioners & Communities",
    body: "We sponsor outreach training for clinicians and support neurotherapy services for communities in need — bringing evidence-based care to people and places that need it most.",
  },
  {
    icon: HeartHandshake,
    title: "Championing Neurotherapy",
    body: "We work to raise awareness of neurotherapy among healthcare practitioners and the general public — because the field's impact depends on people knowing what it can do.",
  },
];

const CREDIBILITY_ITEMS = [
  { value: "501(c)(3)", label: "Independent nonprofit organization" },
  { value: "Global", label: "Research and program reach" },
  { value: "Founded 2026", label: "Building what the field needs now" },
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
    <section
      className="relative flex min-h-screen items-center justify-center px-6 pb-24 pt-32 md:px-12"
      style={{
        backgroundImage: "url(/hero-home.jpg)",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-navy/70" />
      <MeridianLines />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal-light">
          501(c)(3) Nonprofit Organization
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-7xl">
          Anchored in evidence.
          <br />
          Global in reach.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
          The Meridian Foundation for Neurotherapy advances neurotherapy through
          rigorous research, practitioner training, and expanded access to
          evidence-based care for underserved communities worldwide.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy"
          >
            Our Mission
          </Link>
          <Link
            href="/contact"
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

function CredibilityBar() {
  return (
    <section className="bg-navy px-6 py-14 md:px-12">
      <FadeInUp className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {CREDIBILITY_ITEMS.map((item) => (
            <div key={item.value} className="text-center">
              <p className="text-3xl font-extrabold text-gold md:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </FadeInUp>
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
          Three purposes. One foundation.
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <FadeInUp key={pillar.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-slate/10 border-t-4 border-t-teal bg-cloud p-8">
                <pillar.icon className="mb-5 h-8 w-8 text-teal" />
                <h3 className="mb-3 text-xl font-bold text-navy">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate">
                  {pillar.body}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

function PullQuoteSection() {
  return (
    <section className="bg-cloud px-6 py-20 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl">
        <blockquote className="border-l-4 border-teal pl-8">
          <p className="text-xl leading-relaxed text-navy/80 md:text-2xl">
            &ldquo;Neurotherapy has demonstrated real clinical value. The
            field&rsquo;s problem isn&rsquo;t the science&nbsp;&mdash; it&rsquo;s
            that the awareness of these tools and the infrastructure to support it
            don&rsquo;t yet exist at scale, and most people in need never reach a
            practitioner. That&rsquo;s what Meridian is here to change.&rdquo;
          </p>
          <cite className="mt-5 block text-sm font-medium not-italic text-slate">
            &mdash;Nathan Brown, PhD, Chair, The Meridian Foundation for
            Neurotherapy
          </cite>
        </blockquote>
      </FadeInUp>
    </section>
  );
}

function NarrativeSection() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-3xl font-bold text-navy md:text-4xl">
          Precision and compassion working together.
        </h2>
        <p className="mb-5 text-base leading-relaxed text-slate">
          Neurotherapy is at an inflection point. The clinical evidence is
          compelling, and the field&rsquo;s next step is building the shared
          foundation to support scaled delivery&nbsp;&mdash; standardized
          protocols, normative databases, and the training infrastructure to carry
          evidence-based care into communities that have gone without it for too
          long.
        </p>
        <p className="text-base leading-relaxed text-slate">
          Meridian Foundation For Neurotherapy was created to accelerate that
          work. We advance the science, support the practitioners, and champion
          the field&nbsp;&mdash; so that neurotherapy reaches everyone who can
          benefit from it.
        </p>
      </FadeInUp>
    </section>
  );
}

function EarlyMomentumSection() {
  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Where We&rsquo;re Starting
        </p>
        <h2 className="mb-6 text-3xl font-bold text-navy md:text-4xl">
          The work is already underway.
        </h2>
        <p className="text-base leading-relaxed text-slate">
          Meridian&rsquo;s first international program is taking shape in Kenya,
          where we are collaborating with local healthcare professionals and
          academics to develop a training infrastructure that can support an
          inaugural cohort of neurotherapy practitioners serving East African
          communities.
        </p>
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
          Partner with us, support vital research, and help us expand access to
          innovative care.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
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
      <CredibilityBar />
      <PillarsSection />
      <PullQuoteSection />
      <NarrativeSection />
      <EarlyMomentumSection />
      <CtaBanner />
    </>
  );
}
