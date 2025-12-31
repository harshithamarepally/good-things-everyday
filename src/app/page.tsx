"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 60, 60, 0]); // Move Right
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 0.9],
    [0, -150, -150, 0]
  ); // Lift Up
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 0.9],
    [0, 25, 25, 0]
  ); // Tilt

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative h-130 w-130 top-150">
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
            className="z-30 object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="h-[100vh] w-full"></div>
    </main>
  );
}
