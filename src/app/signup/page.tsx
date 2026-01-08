"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!username || !password || !confirmPassword) {
      setError("please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("passwords do not match!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const emailToUse = `${username.trim()}@jar.local`;

    const { error: signUpError } = await supabase.auth.signUp({
      email: emailToUse,
      password: password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex h-[700px] w-[700px] items-center justify-center p-12">
        <div className="absolute inset-0">
          <Image
            src="/assets/signup-note.png"
            alt="note background"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 flex h-[500px] w-[500px] flex-col items-center justify-center gap-4 pt-10 text-center">
          <form
            onSubmit={handleSignup}
            className="flex mt-16 w-3/4 flex-col gap-4"
          >
            <input
              type="text"
              placeholder="choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-b-2 border-[#634E34] bg-transparent py-2 text-center text-lg text-[#634E34] placeholder:text-[#967751] font-sans focus:outline-none"
            />

            <input
              type="password"
              placeholder="choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 border-[#634E34] bg-transparent py-2 text-center text-lg text-[#634E34] placeholder:text-[#967751] font-sans focus:outline-none"
            />

            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-b-2 border-[#634E34] bg-transparent py-2 text-center text-lg text-[#634E34] placeholder:text-[#967751] font-sans focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 rounded-full bg-[#634E34] px-6 py-2 text-[#F5E9D3] hover:scale-105 transition-transform font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Jar"}
            </button>
          </form>

          <p
            className="text-sm text-[#634E34]"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            already have a jar?{" "}
            <Link
              href="/login"
              className="underline decoration-2 text-[#002659]"
            >
              log in!
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
