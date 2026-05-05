import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeInUp from "@/components/sections/FadeInUp";

export const metadata: Metadata = {
  title: "Global Initiatives | Meridian Neuro Foundation",
  description:
    "Meridian Neuro Foundation brings neurotherapy education, clinical training, and collaborative research to academic partners worldwide. Our first initiative launches in Nairobi, Kenya with USIU-Africa.",
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
          Meridian Neuro Foundation brings neurotherapy education, clinical
          training, and collaborative research alongside academic partners who
          have deep insight into what neurotherapy can look like in their
          regions.
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
          USIU-Africa Partnership
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
            In early 2026, Meridian Neuro Foundation established a formal
            academic partnership with United States International
            University&ndash;Africa (USIU-Africa), one of East Africa&rsquo;s
            leading private universities, with accredited programs in psychology,
            counseling, and behavioral health. Our partnership centers on
            neurotherapy education, clinical training, and collaborative
            inquiry&nbsp;&mdash; shaped from the outset by the distinctive
            cultural and clinical context of mental health practice in the
            region.
          </p>
          <p className="text-base leading-relaxed text-slate">
            USIU-Africa&rsquo;s faculty and students bring deep familiarity with
            the mental health landscape of East Africa&nbsp;&mdash; a
            perspective that is essential to neurotherapy establishing deep and
            meaningful roots in this region. Together, the partnership assembles
            a training and mentoring framework, assessment tools, and a shared
            commitment to co-developing normative standards that reflect the
            full range of human neurodiversity and resilience. The partnership
            also opens the door to future collaborative research and data
            collection as the relationship matures.
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

        <div className="mt-16">
          <h3 className="mb-6 text-2xl font-bold text-navy">
            Inaugural Program Visit &mdash; May 2026
          </h3>
          <p className="text-base leading-relaxed text-slate">
            Dr. Nathan Brown, Meridian&rsquo;s founding Chair, will travel to
            Nairobi in May 2026 for the partnership&rsquo;s inaugural program
            visit. The visit is designed to reach multiple audiences and serve
            overlapping goals: to introduce the concept and science of
            neurotherapy to a broad academic audience; to engage clinicians and
            graduate students in substantive conversation about what
            neurotherapy practice looks like and what its potential holds for the
            region; and to move beyond the conceptual entirely&nbsp;&mdash;
            putting devices in hand and demonstrating directly how neurotherapy
            works.
          </p>
        </div>
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
