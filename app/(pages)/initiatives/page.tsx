import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeInUp from "@/components/sections/FadeInUp";

export const metadata: Metadata = {
  title: "Global Initiatives | Meridian Neuro Foundation",
  description:
    "The Meridian Foundation for Neurotherapy brings neurotherapy education, training, and research expertise into dialogue with academic and healthcare partners worldwide. Inaugural visiting-scholar engagement at USIU-Africa, Nairobi, May 2026.",
};

function PageHeader() {
  return (
    <section className="bg-cloud px-6 pb-16 pt-32 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Global Initiatives
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-navy md:text-5xl">
          Where the science is already at work.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate md:text-xl">
          The Meridian Foundation for Neurotherapy brings neurotherapy
          education, training, and expertise in research into dialogue with
          academic partners and healthcare practitioners worldwide who have
          deep insight into what neurotherapy may be able to provide to those
          in need in their regions.
        </p>
      </div>
    </section>
  );
}

function KenyaInitiative() {
  return (
    <section className="bg-white px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          East Africa &middot; Nairobi, Kenya
        </p>
        <h2 className="mb-6 text-3xl font-bold text-navy md:text-4xl">
          Visiting Scholar Engagement at USIU-Africa
        </h2>

        <div className="mb-10">
          <Image
            src="/usiu-africa-logo.png"
            alt="United States International University-Africa logo"
            width={320}
            height={120}
            className="h-auto w-56 md:w-64"
            priority
          />
        </div>

        <div className="space-y-5">
          <p className="text-base leading-relaxed text-slate">
            In May 2026, the School of Humanities and Social Sciences at
            United States International University&ndash;Africa (USIU-Africa),
            through its Department of Psychology, will host Dr. Nathan Brown,
            Meridian&rsquo;s founding Chair, as a visiting scholar. USIU-Africa
            is one of East Africa&rsquo;s leading private universities, with
            accredited programs in psychology, counseling, and behavioral
            health.
          </p>
          <p className="text-base leading-relaxed text-slate">
            USIU&rsquo;s invitation to Dr. Brown frames this visit to Nairobi
            as the platform from which a deeper global collaboration may
            emerge, focused on research and evidence-based mental health
            neuro-based care, with the eventual aim of expanding neurotherapy
            training to practitioners across Kenya and the wider region.
            Neurotherapy is a new specialization here, and the host institution
            describes the training as filling a gap where conventional
            pharmaceutical and traditional therapeutic options are too often
            limited and inaccessible to much of the population.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-cloud">
              <Image
                src="/usiu-africa-campus.png"
                alt="USIU-Africa main campus entrance celebrating 50 Years of Academic Excellence, Nairobi, Kenya"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-slate">
              USIU-Africa main campus, Nairobi.
            </figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-cloud">
              <Image
                src="/usiu-africa-humanities.png"
                alt="USIU-Africa School of Humanities and Social Sciences building"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-slate">
              School of Humanities &amp; Social Sciences.
            </figcaption>
          </figure>
        </div>

        <p className="mt-12 text-base leading-relaxed text-slate">
          To learn more about this visit, follow{" "}
          <a
            href="https://www.linkedin.com/company/meridian-neuro-foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal underline-offset-4 transition-colors hover:text-teal-light hover:underline"
          >
            Meridian Neuro on LinkedIn
          </a>
          , or Dr. Brown&rsquo;s{" "}
          <a
            href="https://nathanbrownphd.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal underline-offset-4 transition-colors hover:text-teal-light hover:underline"
          >
            Headstrong publication on Substack
          </a>
          .
        </p>
      </FadeInUp>
    </section>
  );
}

function InitiativesCta() {
  return (
    <section className="bg-cloud px-6 py-24 md:px-12">
      <FadeInUp className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-navy md:text-4xl">
          Interested in partnership or research collaboration?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate">
          We&rsquo;re building a network of academic and clinical partners
          worldwide. If your institution is working at the intersection of
          neuroscience and underserved mental health&nbsp;&mdash; we want to
          hear from you.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block text-sm font-semibold text-teal transition-colors hover:text-teal-light"
        >
          Get in touch &rarr;
        </Link>
      </FadeInUp>
    </section>
  );
}

export default function InitiativesPage() {
  return (
    <>
      <PageHeader />
      <KenyaInitiative />
      <InitiativesCta />
    </>
  );
}
