"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SlowerScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisOptions = {
    lerp: 0.1,
    duration: 2.5,
    smoothTouch: false,
    wheelMultiplier: 0.4,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children as any}
    </ReactLenis>
  );
}
