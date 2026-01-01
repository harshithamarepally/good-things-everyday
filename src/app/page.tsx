"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [note, setNote] = useState("");

  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 90, 90, 0]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 0.9],
    [0, -190, -190, 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 0.9],
    [0, 20, 20, 0]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative h-100 w-100 top-15">
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
      </div>
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

        <motion.div style={{ x, y, rotate }} className="absolute inset-0 z-30">
          <Image
            src="/assets/jar-lid.png"
            alt="jar-cork-lid"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="h-screen w-full"></div>
    </main>
  );
}
