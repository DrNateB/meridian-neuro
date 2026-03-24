import type { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Globe,
  Lightbulb,
  Users,
  ShieldCheck,
} from "lucide-react";
import FadeInUp from "@/components/sections/FadeInUp";

export const metadata: Metadata = {
  title: "About | Meridian Foundation for Neurotherapy",
  description:
    "Learn about our mission, vision, core values, and the board of directors leading the Meridian Foundation for Neurotherapy.",
};

const VALUES = [
  {
    icon: Target,
    title: "Precision",
    body: "Rigorous standards and evidence-based practices that advance the scientific credibility and effectiveness of neurotherapy.",
  },
  {
    icon: Globe,
    title: "Access",
    body: "Quality neurotherapy should reach everyone who needs it, regardless of geography or economic circumstances.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    body: "Advancing the science and practice of neurotherapy through cutting-edge research and creative solutions to implementation challenges.",
  },
  {
    icon: Users,
    title: "Collaboration",
    body: "Working across borders, disciplines, and sectors to achieve outcomes no single entity could accomplish alone.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    body: "Transparency, scientific rigor, and unwavering commitment to our charitable mission.",
  },
];

const BOARD = [
  { name: "Dr. Nathan Brown", role: "Chair", initial: "N" },
  { name: "Heather Newton", role: "Vice Chair & Treasurer", initial: "H" },
  { name: "Jim Hart", role: "Secretary", initial: "J" },
];

const BADGES = ["501(c)(3) Nonprofit", "EIN: 41-2819471", "Independent Governance"];

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="bg-cloud px-6 pb-20 pt-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Our Story
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
          Precision and compassion working together.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">
          We&rsquo;re strengthening the scientific foundation neurotherapy
          needs&nbsp;&mdash; while ensuring evidence-based care reaches every
          community that needs it.
        </p>
      </div>
    </section>
  );
}

/* ─── Mission & Vision ─── */
function MissionVision() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <div className="mb-12 overflow-hidden rounded-2xl">
          <Image
            src="/mission.jpg"
            alt="Supporting communities through neurotherapy"
            width={1200}
            height={500}
            className="h-[300px] w-full object-cover md:h-[400px]"
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {/* Mission */}
          <div className="border-l-4 border-teal pl-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Mission
            </p>
            <p className="text-lg leading-relaxed text-navy/80">
              Meridian Foundation for Neurotherapy advances neurotherapy through
              rigorous research, practitioner training, and expanded access to
              evidence-based care for underserved communities worldwide.
            </p>
          </div>

          {/* Vision */}
          <div className="border-l-4 border-gold pl-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Vision
            </p>
            <p className="text-lg leading-relaxed text-navy/80">
              A world where neurotherapy is accessible, standardized, and
              scientifically validated as a cornerstone of mental health
              treatment.
            </p>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Why We Exist ─── */
function WhyWeExist() {
  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-3xl font-bold text-navy md:text-4xl">
          Why the Meridian Foundation for Neurotherapy exists.
        </h2>
        <p className="mb-5 text-base leading-relaxed text-slate">
          Neurotherapy has transformative potential&nbsp;&mdash; we&rsquo;ve seen
          it help people overcome anxiety, ADHD, trauma, and other challenges
          where conventional approaches have often fallen short or left patients
          without satisfying options.
        </p>
        <p className="mb-5 text-base leading-relaxed text-slate">
          Neurotherapy is at an inflection point. The clinical evidence is
          compelling, and the field&rsquo;s next step is building the shared
          foundation to match it. Standardized protocols, normative databases, and
          technical specifications: these are the tools that established medical
          disciplines rely on, and neurotherapy is building them now. That&rsquo;s
          the work Meridian&rsquo;s research program exists to accelerate.
        </p>
        <p className="mb-5 text-base leading-relaxed text-slate">
          Effective neurotherapy has concentrated in wealthy urban centers&nbsp;&mdash;
          but the communities carrying the greatest mental health burden are rarely
          there. Extending that reach sustainably and at scale is the second pillar
          of everything Meridian does.
        </p>
        <p className="text-base leading-relaxed text-slate">
          And beyond research and access, the field itself needs advocates.
          Neurotherapy&rsquo;s impact depends on practitioners knowing how to use
          it and the public knowing it exists. Championing the field is the third
          thing Meridian is here to do.
        </p>
      </FadeInUp>
    </section>
  );
}

/* ─── Pull Quote ─── */
function PullQuote() {
  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl">
        <blockquote className="rounded-2xl border border-teal/30 bg-teal/5 p-8 md:p-10">
          <p className="text-lg leading-relaxed text-navy/80 md:text-xl">
            &ldquo;Like the prime meridian that serves as the reference point for
            navigation worldwide, we establish the standards that guide neurotherapy
            practice&nbsp;&mdash; and like meridian lines that circle the globe, we
            expand access to every region, every community.&rdquo;
          </p>
          <cite className="mt-5 block text-sm font-medium not-italic text-slate">
            &mdash;Heather Newton, Vice Chair, The Meridian Foundation for
            Neurotherapy
          </cite>
        </blockquote>
      </FadeInUp>
    </section>
  );
}

/* ─── Core Values ─── */
function CoreValues() {
  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Core Values
        </p>
        <h2 className="mb-14 text-center text-4xl font-bold text-navy">
          What guides everything we do.
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <FadeInUp key={v.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-slate/10 p-6 transition-shadow hover:shadow-md">
                <v.icon className="mb-4 h-7 w-7 text-teal" />
                <h3 className="mb-2 text-lg font-bold text-navy">{v.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{v.body}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Board of Directors ─── */
function BoardSection() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Leadership
        </p>
        <h2 className="mb-14 text-4xl font-bold text-navy">
          Board of Directors
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {BOARD.map((person, i) => (
            <FadeInUp key={person.name} delay={i * 0.1}>
              <div className="rounded-2xl border border-slate/10 bg-cloud p-8">
                {person.name === "Dr. Nathan Brown" ? (
                  <Image
                    src="/drnathan.jpg"
                    alt="Dr. Nathan Brown"
                    width={56}
                    height={56}
                    className="mb-5 h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-2xl font-bold text-white">
                    {person.initial}
                  </div>
                )}
                <h3 className="text-xl font-bold text-navy">{person.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-teal">
                  {person.role}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Legal Transparency ─── */
function LegalSection() {
  return (
    <section className="bg-navy px-6 py-16 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl text-center">
        <h3 className="mb-4 text-2xl font-bold text-white">
          Organizational Transparency
        </h3>
        <p className="mb-8 text-sm leading-relaxed text-white/70">
          The Meridian Foundation for Neurotherapy is the operating name of
          Meridian Foundation for Neurotherapy, an independent 501(c)(3) nonprofit
          organization. We collaborate with educational institutions, training
          organizations, and professional associations to advance our charitable
          mission, but we are not affiliated with any commercial entity.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-white/10 px-4 py-1 text-sm text-white"
            >
              {badge}
            </span>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <MissionVision />
      <WhyWeExist />
      <PullQuote />
      <CoreValues />
      <BoardSection />
      <LegalSection />
    </>
  );
}
