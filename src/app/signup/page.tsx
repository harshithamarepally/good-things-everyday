import Image from "next/image";

export default function SignUpPage() {
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
      </div>
    </main>
  );
}
