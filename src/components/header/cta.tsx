import { scrollToSection } from "@/lib/utils";

/**
 * Call-to-action button component for header
 * Scrolls to the getting started section when clicked
 * @returns CTA button that navigates to getting started section
 */
const Cta = () => {
  return (
    <button
      type="button"
      className="dark:to-coral-600 hidden rounded-lg bg-linear-to-r from-orange-700 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] sm:block dark:from-orange-800"
      onClick={() => scrollToSection("getting-started")}
      aria-label="Get Started"
    >
      Get Started
    </button>
  );
};

Cta.displayName = "Cta";

export default Cta;
