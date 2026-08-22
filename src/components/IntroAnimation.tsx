"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "eyenews-intro-seen";

export default function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (!alreadySeen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setClosing(true);
    document.body.style.overflow = "";
    window.setTimeout(() => setVisible(false), 500);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <video
            ref={videoRef}
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

          <button
            onClick={dismiss}
            className="absolute bottom-6 right-6 rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/50 sm:bottom-8 sm:right-8"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
