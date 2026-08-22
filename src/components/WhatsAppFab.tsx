import { CONTACT } from "@/lib/site-data";

export default function WhatsAppFab() {
  const href = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    CONTACT.whatsappMessage,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-[#20bd5a] active:scale-95"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.362.687 4.564 1.872 6.417L4 29l7.79-1.836A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm7.03 17.14c-.298.837-1.47 1.53-2.412 1.732-.642.137-1.48.246-4.303-.925-3.612-1.497-5.937-5.155-6.118-5.396-.174-.24-1.463-1.948-1.463-3.716s.918-2.637 1.245-3 .71-.454.947-.454c.236 0 .473.002.68.013.218.011.51-.083.798.61.298.717 1.014 2.485 1.104 2.665.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.377.469-.539.63-.18.18-.367.375-.157.735.209.36.928 1.53 1.992 2.478 1.369 1.22 2.523 1.598 2.883 1.778.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.208 1.71Z" />
      </svg>
    </a>
  );
}
