import type { Metadata } from "next";
import {
  CheckCircle2,
  MapPin,
  DollarSign,
  Globe,
  Building2,
} from "lucide-react";
import FadeInUp from "@/components/sections/FadeInUp";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Access | Meridian Neuro Foundation",
  description: "We partner with communities worldwide to implement scalable, sustainable neurotherapy programs for underserved populations.",
};

const TARGET_POPULATIONS = [
  {
    icon: MapPin,
    title: "Rural Communities",
    body: "Geographic isolation shouldn't determine access to effective mental health care.",
  },
  {
    icon: DollarSign,
    title: "Low-Income Individuals",
    body: "Financial barriers are removed through our grant programs and subsidized partnerships.",
  },
  {
    icon: Globe,
    title: "Developing Regions",
    body: "We partner internationally to implement scalable programs where mental health resources are scarce.",
  },
  {
    icon: Building2,
    title: "Underserved Urban Areas",
    body: "High-need urban communities often face the same access barriers as rural populations.",
  },
];

const WHAT_WE_BRING = [
  "Evidence-based protocols and standards",
  "Equipment and technology resources",
  "Training and ongoing support",
  "Connection to global research community",
];

const WHAT_YOU_BRING = [
  "Deep community knowledge and relationships",
  "Cultural context and sensitivity",
  "Commitment to sustainable implementation",
  "Local leadership and ownership",
];

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="bg-cloud px-6 pb-20 pt-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Global Access
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
          Evidence-based care for every community.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">
          We partner with organizations worldwide to implement scalable,
          sustainable neurotherapy programs that reach underserved populations
          regardless of geography or economics.
        </p>
      </div>
    </section>
  );
}

/* ─── The Problem ─── */
function TheProblem() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          The Challenge
        </p>
        <h2 className="mb-10 max-w-2xl text-4xl font-bold text-navy">
          Most people who could benefit never access care.
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-slate">
              Neurotherapy concentrates in wealthy urban areas. Cost and
              geography create impossible barriers for rural communities,
              low-income individuals, and populations in developing
              regions&nbsp;&mdash; often those with the greatest need.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-cloud p-6">
              <p className="text-3xl font-extrabold text-navy">1 in 5</p>
              <p className="mt-1 text-sm text-slate">
                adults experience a mental health condition annually
              </p>
            </div>
            <div className="rounded-2xl bg-cloud p-6">
              <p className="text-3xl font-extrabold text-navy">Limited</p>
              <p className="mt-1 text-sm text-slate">
                neurotherapy access in rural and low-income communities
              </p>
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Partnership Model ─── */
function PartnershipModel() {
  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          How We Work
        </p>
        <h2 className="mb-4 text-center text-4xl font-bold text-navy">
          You bring the community. We bring the resources.
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-base text-slate">
          Our partnerships are built on mutual respect&nbsp;&mdash; local knowledge
          meets global standards.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {/* What We Bring */}
          <div className="rounded-2xl border border-slate/10 bg-white p-8">
            <h3 className="mb-6 text-lg font-bold text-navy">What We Bring</h3>
            <div className="space-y-4">
              {WHAT_WE_BRING.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" />
                  <p className="text-sm text-slate">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What You Bring */}
          <div className="rounded-2xl border border-slate/10 bg-white p-8">
            <h3 className="mb-6 text-lg font-bold text-navy">What You Bring</h3>
            <div className="space-y-4">
              {WHAT_YOU_BRING.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                  <p className="text-sm text-slate">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Who We Serve ─── */
function WhoWeServe() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Target Populations
        </p>
        <h2 className="mb-14 text-center text-4xl font-bold text-navy">
          Reaching those who need care most.
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TARGET_POPULATIONS.map((pop, i) => (
            <FadeInUp key={pop.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-slate/10 p-6 transition-shadow hover:shadow-md">
                <pop.icon className="mb-4 h-7 w-7 text-teal" />
                <h3 className="mb-2 text-lg font-bold text-navy">
                  {pop.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate">{pop.body}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Partner CTA ─── */
function PartnerCTA() {
  return (
    <section className="bg-teal px-6 py-20 text-center md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to bring neurotherapy to your community?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Whether you&rsquo;re a community health organization, NGO, or
          healthcare provider&nbsp;&mdash; we want to hear from you.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-teal transition-opacity hover:opacity-90"
          >
            Start a Conversation
          </Link>
          <Link
            href="/grants"
            className="rounded-full border-2 border-white px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-teal"
          >
            View Grant Programs
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}

export default function AccessPage() {
  return (
    <>
      <PageHero />
      <TheProblem />
      <PartnershipModel />
      <WhoWeServe />
      <PartnerCTA />
    </>
  );
}
