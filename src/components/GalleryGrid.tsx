import Image from "next/image";

interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

// Intrinsic dimensions captured directly from the source files so next/image can size each
// tile correctly inside the masonry columns without layout shift.
const PHOTOS: GalleryPhoto[] = [
  { src: "/gallery/gallery-01.jpg", width: 3503, height: 3024, alt: "The EYE-PAC INDIA team at the office" },
  { src: "/gallery/gallery-02.jpg", width: 4032, height: 3024, alt: "Field team on the ground" },
  { src: "/gallery/gallery-03.jpg", width: 3724, height: 2096, alt: "Campaign and field operations" },
  { src: "/gallery/gallery-04.jpg", width: 3024, height: 4032, alt: "On-ground engagement" },
  { src: "/gallery/gallery-05.jpg", width: 3138, height: 3024, alt: "EYE-PAC INDIA team" },
  { src: "/gallery/gallery-06.jpg", width: 1195, height: 1555, alt: "Field visit" },
  { src: "/gallery/gallery-07.jpg", width: 4032, height: 3024, alt: "Campaign strategy session" },
  { src: "/gallery/gallery-08.jpg", width: 4032, height: 3024, alt: "Team at work" },
  { src: "/gallery/gallery-09.jpg", width: 1842, height: 4096, alt: "Ground intelligence work" },
  { src: "/gallery/gallery-10.jpg", width: 1842, height: 4096, alt: "Public engagement" },
  { src: "/gallery/gallery-11.jpg", width: 1842, height: 4096, alt: "Field operations" },
  { src: "/gallery/gallery-12.jpg", width: 1842, height: 4096, alt: "On the ground" },
];

export default function GalleryGrid() {
  return (
    <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
      {PHOTOS.map((photo) => (
        <div
          key={photo.src}
          className="mb-3 break-inside-avoid overflow-hidden rounded-lg sm:mb-4"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
            className="w-full transition duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
