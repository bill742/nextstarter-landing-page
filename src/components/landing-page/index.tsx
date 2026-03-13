import About from "./about";
import Features from "./features";
import GettingStarted from "./getting-started";
import Stack from "./stack";

/**
 * Default home page component displaying project features and installation instructions
 * @returns Home page with technology carousel, features list, and GitHub link
 */
const LandingPage = () => {
  return (
    <>
      <h1 className="sr-only">
        NextStarter - A boilerplate for creating NextJS projects with TypeScript
        and Tailwind.
      </h1>
      <About />

      <Stack />

      <Features />

      <GettingStarted />
    </>
  );
};

LandingPage.displayName = "LandingPage  ";

export default LandingPage;
