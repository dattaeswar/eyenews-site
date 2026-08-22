"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/site-data";

const SESSION_KEY = "eyenews-intro-seen";

export default function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (!alreadySeen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }

    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setClosing(true);
    document.body.style.overflow = "";
    window.setTimeout(() => setVisible(false), 500);
  };

  if (!visible || isMobile === null) return null;

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary-950 px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isMobile ? (
            // The source animation is a wide landscape composition — cropping it to fill a
            // tall screen (object-cover) chops off the wordmark. Contain it instead and use
            // the site's own crisp type for the tagline below the video.
            <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
              <video
                className="max-h-[52vh] w-full object-contain"
                autoPlay
                muted
                playsInline
                poster="/video/intro-poster.jpg"
                onEnded={dismiss}
              >
                <source src="/video/intro.webm" type="video/webm" />
                <source src="/video/intro.mp4" type="video/mp4" />
              </video>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="font-serif text-2xl font-semibold text-white">EYE-NEWS</p>
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent-400">
                  Indian Times
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-neutral-400">
                  {SITE.tagline}
                </p>
              </motion.div>
            </div>
          ) : (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              poster="/video/intro-poster.jpg"
              onEnded={dismiss}
            >
              <source src="/video/intro.webm" type="video/webm" />
              <source src="/video/intro.mp4" type="video/mp4" />
            </video>
          )}

          <button
            onClick={dismiss}
            className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
