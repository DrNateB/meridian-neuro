import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeInUp from "@/components/sections/FadeInUp";

export const metadata: Metadata = {
  title: "Research & Standards | Meridian Neuro Foundation",
  description: "We fund normative databases, clinical protocols, and technical specifications that elevate neurotherapy practice worldwide.",
};

const FOCUS_AREAS = [
  {
    number: "01",
    title: "Normative Databases",
    body: "Developing the reference standards practitioners rely on for accurate neurotherapy assessment and intervention across diverse populations.",
  },
  {
    number: "02",
    title: "Clinical Protocols",
    body: "Establishing evidence-based treatment protocols that ensure consistent, high-quality neurotherapy outcomes regardless of where care is delivered.",
  },
  {
    number: "03",
    title: "Technical Specifications",
    body: "Defining quality standards for neurotherapeutic devices and equipment to ensure reliability, safety, and reproducibility across the field.",
  },
];

const METHODOLOGY_ITEMS = [
  "Peer-reviewed methodology",
  "Multi-site collaboration",
  "Cross-cultural validity",
  "Open access dissemination",
];

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="bg-cloud px-6 pb-20 pt-32 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            Research &amp; Standards
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
            Building the scientific foundation neurotherapy needs.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">
            We fund research that creates normative databases, evidence-based
            clinical protocols, and technical specifications that elevate
            neurotherapy practice worldwide.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/hero-research.jpg"
            alt="Neurotherapy research in practice"
            width={600}
            height={400}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Three Focus Areas ─── */
function FocusAreas() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Research Priorities
        </p>
        <h2 className="mb-14 max-w-xl text-4xl font-bold text-navy">
          What we fund and why.
        </h2>

        <div className="space-y-0">
          {FOCUS_AREAS.map((area, i) => (
            <div key={area.number}>
              <FadeInUp delay={i * 0.08}>
                <div className="flex flex-col gap-6 py-8 md:flex-row md:items-start">
                  <div className="w-24 shrink-0">
                    <p className="text-6xl font-extrabold text-gold">
                      {area.number}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-navy">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {area.body}
                    </p>
                  </div>
                </div>
              </FadeInUp>
              {i < FOCUS_AREAS.length - 1 && (
                <div className="border-b border-slate/10" />
              )}
            </div>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Methodology ─── */
function Methodology() {
  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        {/* Left: Our Approach */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            Our Approach
          </p>
          <h2 className="mb-6 text-4xl font-bold text-navy">
            Rigorous by design. Open by default.
          </h2>
          <p className="mb-8 text-base leading-relaxed text-slate">
            Our research model emphasizes methodological rigor, multi-site
            collaboration, and open dissemination. Findings don&rsquo;t sit
            behind paywalls&nbsp;&mdash; they&rsquo;re made available to
            practitioners, researchers, and clinicians worldwide.
          </p>

          <div className="space-y-3">
            {METHODOLOGY_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" />
                <span className="text-sm font-medium text-navy/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Why It Matters */}
        <div className="rounded-2xl border border-teal/30 bg-teal/5 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            Why It Matters
          </p>
          <blockquote className="mt-4 text-lg leading-relaxed text-navy/80 md:text-xl">
            Without standardized protocols and normative databases, practitioners
            work in isolation, outcomes vary wildly, and the field struggles for
            credibility. Our research changes that.
          </blockquote>
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Research Partner CTA ─── */
function PartnerCTA() {
  return (
    <section className="bg-navy px-6 py-20 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Interested in research collaboration?
        </h2>
        <p className="mt-4 text-white/70">
          We seek partners who share our commitment to rigor, reproducibility,
          and practical impact. Whether you&rsquo;re an academic institution,
          independent researcher, or clinical organization&nbsp;&mdash; let&rsquo;s
          talk.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-teal transition-opacity hover:opacity-90"
          >
            Get In Touch
          </Link>
          <Link
            href="/grants"
            className="rounded-full border-2 border-white px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy"
          >
            Learn About Grants
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <>
      <PageHero />
      <FocusAreas />
      <Methodology />
      <PartnerCTA />
    </>
  );
}
