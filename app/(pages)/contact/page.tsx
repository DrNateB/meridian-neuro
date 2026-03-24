import type { Metadata } from "next";
import { FlaskConical, Users, HeartHandshake, Mail } from "lucide-react";
import FadeInUp from "@/components/sections/FadeInUp";

export const metadata: Metadata = {
  title: "Contact | Meridian Foundation for Neurotherapy",
  description:
    "Whether you're a researcher, clinician, community organization, or potential supporter — we want to hear from you.",
};

const PATHWAYS = [
  {
    icon: FlaskConical,
    title: "Research Collaboration",
    body: "We seek research partners committed to rigorous methodology, multi-site collaboration, and open dissemination. If your work touches normative database development, clinical protocol research, or neurotherapy outcomes — let's talk.",
    email: "info@meridianneuro.org",
    subject: "Research Collaboration",
  },
  {
    icon: Users,
    title: "Practitioner Training & Community Programs",
    body: "If you serve underserved populations and want to bring neurotherapy to your community, or if you're a clinician interested in training and outreach programs, we want to partner with you.",
    email: "info@meridianneuro.org",
    subject: "Practitioner Training",
  },
  {
    icon: HeartHandshake,
    title: "Donations & Support",
    body: "Every gift advances neurotherapy research and expands access to care. The Meridian Foundation for Neurotherapy is a 501(c)(3) nonprofit — all contributions are tax-deductible to the extent allowed by law.",
    email: "info@meridianneuro.org",
    subject: "Donations",
  },
  {
    icon: Mail,
    title: "General Inquiries",
    body: "For press, speaking requests, partnership discussions, or anything else — reach us directly.",
    email: "info@meridianneuro.org",
    subject: "General Inquiry",
  },
];

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="bg-cloud px-6 pb-20 pt-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Get In Touch
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
          Let&rsquo;s advance neurotherapy together.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">
          Whether you&rsquo;re a researcher, clinician, community organization,
          or potential supporter&nbsp;&mdash; we want to hear from you.
        </p>
      </div>
    </section>
  );
}

/* ─── Contact Pathways ─── */
function ContactPathways() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PATHWAYS.map((pathway, i) => (
            <FadeInUp key={pathway.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-slate/10 p-7 transition-shadow hover:shadow-md">
                <pathway.icon className="mb-4 h-6 w-6 text-teal" />
                <h3 className="mb-2 text-lg font-bold text-navy">
                  {pathway.title}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-slate">
                  {pathway.body}
                </p>
                <a
                  href={`mailto:${pathway.email}?subject=${encodeURIComponent(pathway.subject)}`}
                  className="text-sm font-medium text-teal transition-colors hover:text-navy"
                >
                  {pathway.email} &rarr;
                </a>
              </div>
            </FadeInUp>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

/* ─── Contact Details ─── */
function ContactDetails() {
  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-2xl font-bold text-navy">Contact Details</h2>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-teal">
              Email
            </dt>
            <dd>
              <a
                href="mailto:info@meridianneuro.org"
                className="text-sm text-slate transition-colors hover:text-navy"
              >
                info@meridianneuro.org
              </a>
            </dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-teal">
              Website
            </dt>
            <dd className="text-sm text-slate">www.meridianneuro.org</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-teal">
              Mailing Address
            </dt>
            <dd className="text-sm leading-relaxed text-slate">
              2910 East Madison Street
              <br />
              Suite 209
              <br />
              Seattle, WA 98112
            </dd>
          </div>
        </dl>
      </FadeInUp>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero />
      <ContactPathways />
      <ContactDetails />
    </>
  );
}
