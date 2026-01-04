"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [note, setNote] = useState("");
  const [noteLanded, setNoteLanded] = useState(false);

  // jar lid animations
  const lidX = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.55, 0.7],
    [0, 110, 110, 0]
  );
  const lidY = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.55, 0.7],
    [0, -200, -200, 0]
  );
  const lidRotate = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.55, 0.7],
    [0, 25, 25, 0]
  );

  // note fade in out animations
  const noteMorphProgress = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const noteUnfoldedOpacity = useTransform(noteMorphProgress, [0, 0.5], [1, 0]);
  const noteFoldedOpacity = useTransform(noteMorphProgress, [0.5, 1], [0, 1]);
  const noteScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.3]);

  // note moving down animations
  const noteY = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [50, 500, 1210]);

  useEffect(() => {
    const landedCheck = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.7 && !noteLanded) {
        setNoteLanded(true);
      }
    });
    return () => landedCheck();
  }, [scrollYProgress, noteLanded]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <motion.div
        style={{
          y: noteLanded ? 1210 : noteY,
          scale: noteLanded ? 0.3 : noteScale,
        }}
        className="relative h-100 w-100 top-15 z-10"
      >
        <motion.div
          style={{
            opacity: noteLanded ? 0 : noteUnfoldedOpacity,
          }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/blue-note.png"
            alt="blue-post-it-note"
            fill
            className="object-contain"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center p-25">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="something good today was..."
              data-lenis-prevent
              className="h-full w-full resize-none overflow-y-auto overscroll-contain bg-transparent text-xl text-black outline-none placeholder:text-gray-400"
              style={{ fontFamily: "var(--font-shadows)" }}
            />
          </div>
        </motion.div>

        <motion.div
          style={{
            opacity: noteLanded ? 1 : noteFoldedOpacity,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <Image
            src="/assets/blue-folded.png"
            alt="blue-folded-note"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* jar stuff */}
      <div className="relative h-150 w-150 top-150">
        <Image
          src="/assets/jar-back.png"
          alt="jar-back"
          fill
          className="z-0 object-contain"
          priority
        />

        <Image
          src="/assets/jar-front.png"
          alt="jar-front"
          fill
          className="z-20 object-contain"
          priority
        />

        <motion.div
          style={{ x: lidX, y: lidY, rotate: lidRotate }}
          className="absolute inset-0 z-30"
        >
          <Image
            src="/assets/jar-lid.png"
            alt="jar-cork-lid"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="h-250 w-full"></div>
    </main>
  );
}
