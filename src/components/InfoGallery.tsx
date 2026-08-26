"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

// Client-supplied batch of 20 field & campaign photos. Order and the "top 17 / rest under
// More" split were specified directly by the client (WhatsApp instruction, 2026-08-25).
const PHOTOS: GalleryPhoto[] = [
  { src: "/gallery/gallery-01.jpg", width: 1280, height: 958, alt: "Ground Field & Campaign Moment 1" },
  { src: "/gallery/gallery-02.jpg", width: 1026, height: 1280, alt: "Ground Field & Campaign Moment 2" },
  { src: "/gallery/gallery-03.jpg", width: 1098, height: 1280, alt: "Ground Field & Campaign Moment 3" },
  { src: "/gallery/gallery-04.jpg", width: 1280, height: 958, alt: "Ground Field & Campaign Moment 4" },
  { src: "/gallery/gallery-05.jpg", width: 1280, height: 1232, alt: "Ground Field & Campaign Moment 5" },
  { src: "/gallery/gallery-06.jpg", width: 958, height: 1280, alt: "Ground Field & Campaign Moment 6" },
  { src: "/gallery/gallery-07.jpg", width: 1280, height: 958, alt: "Ground Field & Campaign Moment 7" },
  { src: "/gallery/gallery-08.jpg", width: 1500, height: 1000, alt: "Ground Field & Campaign Moment 8" },
  { src: "/gallery/gallery-09.jpg", width: 1280, height: 1062, alt: "Ground Field & Campaign Moment 9" },
  { src: "/gallery/gallery-10.jpg", width: 1280, height: 958, alt: "Ground Field & Campaign Moment 10" },
  { src: "/gallery/gallery-11.jpg", width: 1280, height: 1280, alt: "Ground Field & Campaign Moment 11" },
  { src: "/gallery/gallery-12.jpg", width: 1500, height: 1000, alt: "Ground Field & Campaign Moment 12" },
  { src: "/gallery/gallery-13.jpg", width: 1280, height: 980, alt: "Ground Field & Campaign Moment 13" },
  { src: "/gallery/gallery-14.jpg", width: 1280, height: 958, alt: "Ground Field & Campaign Moment 14" },
  { src: "/gallery/gallery-15.jpg", width: 1062, height: 1280, alt: "Ground Field & Campaign Moment 15" },
  { src: "/gallery/gallery-16.jpg", width: 1280, height: 960, alt: "Ground Field & Campaign Moment 16" },
  { src: "/gallery/gallery-17.jpg", width: 1068, height: 1600, alt: "Ground Field & Campaign Moment 17" },
  { src: "/gallery/gallery-18.jpg", width: 480, height: 280, alt: "Ground Field & Campaign Moment 18" },
  { src: "/gallery/gallery-19.jpg", width: 1024, height: 1536, alt: "Ground Field & Campaign Moment 19" },
  { src: "/gallery/gallery-20.jpg", width: 1024, height: 1536, alt: "Ground Field & Campaign Moment 20" },
];

const INITIAL_COUNT = 17;

export default function InfoGallery() {
  const [showAll, setShowAll] = useState(false);

  const displayedPhotos = showAll ? PHOTOS : PHOTOS.slice(0, INITIAL_COUNT);

  return (
    <div>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 sm:gap-4">
        {displayedPhotos.map((photo) => (
          <div
            key={photo.src}
            className="overflow-hidden rounded-lg"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 23vw, 48vw"
              className="w-full aspect-square object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {!showAll && PHOTOS.length > INITIAL_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="rounded-md bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-800"
          >
            More
          </button>
        </div>
      )}
    </div>
  );
}
