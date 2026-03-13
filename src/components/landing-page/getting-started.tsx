import Link from "next/link";
import { SiGithub } from "react-icons/si";

import { Button } from "@/components/ui/button";

/**
 * Getting started guide component
 * Provides step-by-step instructions for setting up and running the project
 * @returns Getting started section with numbered steps and GitHub link
 */
const GettingStarted = () => {
  return (
    <section
      className="mx-auto max-w-5xl px-6 py-24 md:py-32"
      id="getting-started"
    >
      <div className="space-y-8">
        <h2 className="text-center font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
          Getting Started
        </h2>

        <div className="mx-auto max-w-3xl space-y-6">
          <ol className="space-y-4">
            <li className="flex gap-4 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 font-semibold text-white dark:bg-orange-500">
                1
              </span>
              <div className="space-y-2">
                <p className="font-medium text-stone-900 dark:text-stone-50">
                  Clone the repository
                </p>
                {/* <code className="block rounded bg-stone-100 p-2 text-sm text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                      git clone git@github.com:bill742/nextstarter.git
                      my-new-project
                    </code> */}
                <Button
                  asChild
                  size="lg"
                  className="dark:to-coral-600 bg-linear-to-r from-orange-700 to-orange-600 pr-4 pl-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] dark:from-orange-600"
                  aria-label="View on GitHub"
                >
                  <Link
                    href="https://github.com/bill742/nextstarter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiGithub
                      className="mr-2 h-5 w-5"
                      aria-label="View on GitHub"
                    />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </li>

            <li className="flex gap-4 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 font-semibold text-white dark:bg-orange-500">
                2
              </span>
              <div className="space-y-2">
                <p className="font-medium text-stone-900 dark:text-stone-50">
                  Create environment file
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Create an{" "}
                  <code className="rounded bg-stone-100 px-1.5 py-0.5 dark:bg-stone-800">
                    .env
                  </code>{" "}
                  file by making a copy of the{" "}
                  <code className="rounded bg-stone-100 px-1.5 py-0.5 dark:bg-stone-800">
                    .env.example
                  </code>{" "}
                  file.
                </p>
              </div>
            </li>

            <li className="flex gap-4 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 font-semibold text-white dark:bg-orange-500">
                3
              </span>
              <div className="space-y-2">
                <p className="font-medium text-stone-900 dark:text-stone-50">
                  Install dependencies
                </p>
                <code className="block rounded bg-stone-100 p-2 text-sm text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                  npm install
                </code>
              </div>
            </li>

            <li className="flex gap-4 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 font-semibold text-white dark:bg-orange-500">
                4
              </span>
              <div className="space-y-2">
                <p className="font-medium text-stone-900 dark:text-stone-50">
                  Start development server
                </p>
                <code className="block rounded bg-stone-100 p-2 text-sm text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                  npm run dev
                </code>
              </div>
            </li>

            <li className="flex gap-4 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 font-semibold text-white dark:bg-orange-500">
                5
              </span>
              <div className="space-y-2">
                <p className="font-medium text-stone-900 dark:text-stone-50">
                  View in browser
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Open{" "}
                  <code className="rounded bg-stone-100 px-1.5 py-0.5 dark:bg-stone-800">
                    http://localhost:3000
                  </code>{" "}
                  in your browser
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};
GettingStarted.displayName = "GettingStarted";

export default GettingStarted;
