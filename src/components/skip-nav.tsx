/**
 * Skip to main content link for improved keyboard navigation
 * Hidden by default and becomes visible when focused
 * @returns A skip link anchor element
 */
const SkipNav = () => (
  <a
    className="h-1px w-1px absolute top-auto -left-2500 overflow-hidden focus:static focus:h-auto focus:w-auto"
    href="#main"
  >
    Skip to main content
  </a>
);

SkipNav.displayName = "SkipNav";

export default SkipNav;
