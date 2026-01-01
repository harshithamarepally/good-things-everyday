"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SlowerScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false,
    wheelMultiplier: 0.6,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children as any}
    </ReactLenis>
  );
}
