"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailToUse = `${username.trim()}@jar.local`;
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password: password,
    });

    if (signInError) {
      setError("hmm try username and password again?");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex h-[600px] w-[600px] items-center justify-center p-12">
        <div className="absolute inset-0">
          <Image
            src="/assets/login-note.png"
            alt="note background"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center gap-4 pt-10 text-center">
          <form
            onSubmit={handleLogin}
            className="flex mt-20 w-3/4 flex-col gap-4"
          >
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-b-2 border-[#634E34] bg-transparent py-2 text-center text-lg text-[#634E34] placeholder:text-[#967751] font-sans focus:outline-none"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 border-[#634E34] bg-transparent py-2 text-center text-lg text-[#634E34] placeholder:text-[#967751] font-sans focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 rounded-full bg-[#634E34] px-6 py-2 text-[#F5E9D3] hover:scale-105 transition-transform font-sans"
            >
              {loading ? "Opening..." : "Sign In"}
            </button>
          </form>

          <p
            className="text-sm text-[#634E34]"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            don't have a jar yet?{" "}
            <Link
              href="/signup"
              className="underline decoration-2 text-[#002659]"
            >
              sign up!
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
