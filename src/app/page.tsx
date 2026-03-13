import type { Metadata } from "next";

import LandingPage from "@/components/landing-page";

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  description:
    "A boilerplate for creating NextJS projects with TypeScript and Tailwind.",
};

/**
 * Home page component that conditionally renders production or development content
 * @returns Home page with environment-specific content
 */
const Home = () => {
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "Production";

  return (
    <div className="min-h-screen pt-16">
      <main className="mx-auto max-w-7xl" id="main">
        {/* /// Delete this block to begin your project. /// */}
        {isProduction ? (
          <LandingPage />
        ) : (
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-(family-name:--font-geist-sans) sm:p-20">
            <h1 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
              Welcome to NextStarter!
            </h1>
            <p>
              This is a boilerplate for creating NextJS projects with TypeScript
              and Tailwind.
            </p>
          </div>
        )}
        {/* ////// */}
      </main>
    </div>
  );
};

Home.displayName = "Home";

export default Home;
