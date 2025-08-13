import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert animate-fade-in"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left animate-fade-in-up animate-delay-200">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded hover-lift">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row animate-fade-in-up animate-delay-300">
          <a
            className="rounded-full border border-solid border-transparent transition-spring flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto hover-lift"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-spring flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] hover-scale"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        {/* Animation showcase section */}
        <div className="mt-8 p-6 border border-border rounded-lg glass card-hover animate-fade-in-up animate-delay-500">
          <h2 className="text-lg font-semibold mb-4 gradient-primary bg-clip-text text-transparent">
            ✨ Animation Showcase
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-accent/20 rounded-md hover-lift">
              <h3 className="font-medium mb-2">Smooth Transitions</h3>
              <p className="text-sm text-muted-foreground">Hover over elements to see spring animations</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-md interactive">
              <h3 className="font-medium mb-2">Interactive States</h3>
              <p className="text-sm text-muted-foreground">Click and hover interactions with easing</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-md shimmer">
              <h3 className="font-medium mb-2">Shimmer Effect</h3>
              <p className="text-sm text-muted-foreground">Loading state with shimmer animation</p>
            </div>
            <div className="p-4 bg-muted/20 rounded-md">
              <h3 className="font-medium mb-2">Loading Dots</h3>
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Dark/Light theme support with automatic color transitions
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center animate-fade-in animate-delay-700">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-smooth hover-scale"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-smooth hover-scale"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-smooth hover-scale"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
