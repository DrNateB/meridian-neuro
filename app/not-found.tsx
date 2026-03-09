import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-cloud px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          404
        </p>
        <h1 className="text-5xl font-extrabold text-navy">Page not found.</h1>
        <p className="mt-4 text-base leading-relaxed text-slate">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
