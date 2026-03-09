import type { Metadata } from "next";
import Link from "next/link";
import { User, Building2, CheckCircle2 } from "lucide-react";
import FadeInUp from "@/components/sections/FadeInUp";
import { DONATE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Grant Programs | Meridian Neuro Foundation",
  description: "Financial assistance for individuals and organizations seeking neurotherapy care. Learn about our individual and organization grant programs.",
};

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="bg-cloud px-6 pb-20 pt-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Grant Programs
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
          Removing barriers to neurotherapy care.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">
          We provide financial assistance to individuals and organizations so
          that neurotherapy reaches those who need it most.
        </p>
      </div>
    </section>
  );
}

/* ─── Grant Tracks ─── */
function GrantTracks() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Who We Fund
        </p>
        <h2 className="mb-14 text-4xl font-bold text-navy">
          Two paths to support.
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Individual Grants Card */}
          <div className="rounded-2xl border border-slate/10 border-t-4 border-t-teal p-8">
            <User className="mb-4 h-8 w-8 text-teal" />
            <h3 className="mb-3 text-2xl font-bold text-navy">
              Individual Grants
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-slate">
              If financial barriers are preventing you or a loved one from
              accessing neurotherapy, we may be able to help. Our individual
              grant program provides financial assistance for neurotherapy
              treatment to people who lack the resources to pay for care.
            </p>

            <div className="my-4 border-t border-slate/10" />

            <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-slate">
              Who Can Apply
            </p>
            <div className="mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <p className="text-sm text-slate">
                  Individuals seeking neurotherapy for anxiety, ADHD, trauma, or
                  other conditions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <p className="text-sm text-slate">
                  People who lack insurance coverage or financial resources for
                  treatment
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <p className="text-sm text-slate">
                  Anyone referred by a qualified healthcare provider
                </p>
              </div>
            </div>

            <div className="my-4 border-t border-slate/10" />

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">
              What We Provide
            </p>
            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <p className="text-sm text-slate">
                  Financial assistance for treatment sessions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <p className="text-sm text-slate">
                  Connection to qualified practitioners in your area
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <p className="text-sm text-slate">
                  Support throughout the treatment process
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-teal px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Apply for Individual Grant
            </Link>
          </div>

          {/* Organization Grants Card */}
          <div className="rounded-2xl border border-slate/10 border-t-4 border-t-gold p-8">
            <Building2 className="mb-4 h-8 w-8 text-gold" />
            <h3 className="mb-3 text-2xl font-bold text-navy">
              Organization Grants
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-slate">
              We provide grants to organizations implementing neurotherapy
              programs that serve people in need. We fund community-based
              organizations, healthcare providers and clinics, and projects
              demonstrating innovative applications of neurotherapy for public
              benefit.
            </p>

            <div className="my-4 border-t border-slate/10" />

            <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-slate">
              Who Can Apply
            </p>
            <div className="mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm text-slate">
                  Community-based organizations serving charitable beneficiaries
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm text-slate">
                  Healthcare providers and clinics offering neurotherapy to
                  underserved populations
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm text-slate">
                  Projects with innovative applications of neurotherapy for
                  public benefit
                </p>
              </div>
            </div>

            <div className="my-4 border-t border-slate/10" />

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">
              What We Support
            </p>
            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm text-slate">
                  Program implementation and launch
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm text-slate">
                  Equipment and training resources
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm text-slate">
                  Scalable models serving underserved communities
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Apply for Organization Grant
            </Link>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Application Process ─── */
function ApplicationProcess() {
  const steps = [
    {
      number: 1,
      title: "Submit Your Application",
      body: "Tell us about your situation, treatment needs, and financial circumstances through our contact form.",
    },
    {
      number: 2,
      title: "We Review Your Request",
      body: "Our team reviews every application carefully and confidentially. We focus on need and potential benefit.",
    },
    {
      number: 3,
      title: "We Connect You to Care",
      body: "Approved applicants receive financial assistance and connection to qualified neurotherapy practitioners.",
    },
  ];

  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          How It Works
        </p>
        <h2 className="mb-4 max-w-xl text-4xl font-bold text-navy">
          A straightforward, respectful process.
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-slate">
          Our application process is designed to be clear and dignified. We&rsquo;ll
          ask about your situation, your treatment needs, and your financial
          circumstances. All information is kept confidential.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeInUp key={step.number} delay={i * 0.1}>
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal text-lg font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate">
                  {step.body}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>

        <p className="mt-10 text-center text-sm italic text-slate/70">
          Your financial situation should not determine whether you get the help
          you need.
        </p>
      </FadeInUp>
    </section>
  );
}

/* ─── Call to Action ─── */
function CtaSection() {
  return (
    <section className="bg-navy px-6 py-20 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to apply or learn more?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Whether you&rsquo;re an individual seeking care or an organization serving
          your community &mdash; reach out. We&rsquo;re here to help.
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
            Donate to Fund Grants
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}

export default function GrantsPage() {
  return (
    <>
      <PageHero />
      <GrantTracks />
      <ApplicationProcess />
      <CtaSection />
    </>
  );
}
