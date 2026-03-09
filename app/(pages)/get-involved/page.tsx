import type { Metadata } from "next";
import Link from "next/link";
import FadeInUp from "@/components/sections/FadeInUp";
import { DONATE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get Involved | Meridian Neuro Foundation",
  description: "Donate, partner with us on research, or bring neurotherapy to your community. Every level of involvement creates lasting impact.",
};

const LEVELS = [
  {
    name: "Guiding Light Society",
    amount: "$100,000+",
    body: "Recognition as a founding supporter with quarterly briefings and detailed impact reports.",
  },
  {
    name: "Prime Meridian Circle",
    amount: "$50,000–$99,999",
    body: "Named research or grant fund options with bi-annual strategic updates and recognition in annual report.",
  },
  {
    name: "Navigator's Circle",
    amount: "$25,000–$49,999",
    body: "Priority communications, annual impact report, and direct communication with leadership.",
  },
  {
    name: "Pathfinder Society",
    amount: "$10,000–$24,999",
    body: "Detailed annual impact report, website recognition, and event invitations.",
  },
  {
    name: "Compass Partners",
    amount: "$5,000–$9,999",
    body: "Annual impact updates, website recognition, and semi-annual newsletters.",
  },
  {
    name: "Supporters",
    amount: "$1,000–$4,999",
    body: "Thank you communications and general updates.",
  },
];

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="bg-cloud px-6 pb-20 pt-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Get Involved
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
          Your involvement creates lasting impact.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">
          Whether through financial support, research collaboration, or
          community partnership&nbsp;&mdash; there&rsquo;s a meaningful role for
          you in advancing neurotherapy.
        </p>
      </div>
    </section>
  );
}

/* ─── Ways to Give ─── */
function WaysToGive() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Donate
        </p>
        <h2 className="mb-4 text-4xl font-bold text-navy">
          Support the mission.
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-slate">
          Every gift advances neurotherapy research and expands access to care
          for those who need it most. Meridian Neuro Foundation is a 501(c)(3)
          nonprofit&nbsp;&mdash; all contributions are tax-deductible to the
          extent allowed by law.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEVELS.map((level, i) => (
            <FadeInUp key={level.name} delay={i * 0.08}>
              <div className={`relative rounded-2xl border p-6 transition-all hover:shadow-md ${
                i === 4 ? 'border-teal border-2 overflow-visible' : 'border-slate/10 hover:border-teal/40'
              }`}>
                {i === 4 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-3 py-0.5 text-xs font-semibold text-white">
                    Most Impact
                  </span>
                )}
                <h3 className="text-lg font-bold text-navy">{level.name}</h3>
                <p className="mt-1 text-xl font-extrabold text-gold">
                  {level.amount}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {level.body}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={DONATE_URL}
            className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Make a Gift
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Research & Community Partnership ─── */
function PartnershipsSection() {
  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Research Partners */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Research Partners
            </p>
            <h3 className="mb-4 text-3xl font-bold text-navy">
              Collaborate with us on neurotherapy science.
            </h3>
            <p className="mb-6 text-base leading-relaxed text-slate">
              We seek research partners committed to rigorous methodology,
              multi-site collaboration, and open dissemination of findings.
              Academic institutions, independent researchers, and clinical
              organizations are welcome.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-teal px-7 py-3 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
            >
              Explore Research Partnership
            </Link>
          </div>

          {/* Community Partners */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Community Partners
            </p>
            <h3 className="mb-4 text-3xl font-bold text-navy">
              Bring neurotherapy to your community.
            </h3>
            <p className="mb-6 text-base leading-relaxed text-slate">
              If you serve underserved populations and want to implement
              neurotherapy programs, we want to partner with you. You bring
              local knowledge and relationships&nbsp;&mdash; we bring
              evidence-based protocols and resources.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-gold px-7 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-white"
            >
              Explore Community Partnership
            </Link>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CtaBanner() {
  return (
    <section className="bg-teal px-6 py-20 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to make an impact?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Reach out to discuss how you can advance neurotherapy research and
          expand access to care.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-teal transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
          <Link
            href={DONATE_URL}
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Donate Now
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero />
      <WaysToGive />
      <PartnershipsSection />
      <CtaBanner />
    </>
  );
}
