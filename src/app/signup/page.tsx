"use client";

import Image from "next/image";
import { useState } from "react";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex h-[600px] w-[600px] items-center justify-center p-12">
        <div className="absolute inset-0">
          <Image
            src="/assets/title-note.png"
            alt="note background"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center gap-4 pt-10 text-center">
          <form className="flex mt-16 w-3/4 flex-col gap-4">
            <input
              type="text"
              placeholder="pick ur username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-b-2 border-[#634E34] bg-transparent py-2 text-center text-lg text-[#634E34] placeholder:text-[#967751] font-sans focus:outline-none"
            />
          </form>
        </div>
      </div>
    </main>
  );
}
