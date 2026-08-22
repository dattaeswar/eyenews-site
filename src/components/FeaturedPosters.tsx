import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { getActivePosters } from "@/lib/posters";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export default function FeaturedPosters() {
  const posters = getActivePosters();
  if (posters.length === 0) return null;

  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">
            Featured
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-primary-900 sm:text-4xl">
            From the desk
          </h2>
        </FadeIn>

        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {posters.map((poster) => (
            <a
              key={poster.image}
              href={poster.href}
              target={isExternal(poster.href) ? "_blank" : undefined}
              rel={isExternal(poster.href) ? "noopener noreferrer" : undefined}
              className="group relative aspect-[4/5] w-64 shrink-0 snap-start overflow-hidden rounded-lg border border-neutral-200 sm:w-auto sm:shrink"
            >
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 70vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/10 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-4 font-serif text-lg font-semibold leading-snug text-white">
                {poster.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
