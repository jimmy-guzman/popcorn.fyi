/** True when `pathname` is exactly `sectionTo` or a nested path under it (segment boundary). */
export function isNavSectionActive(pathname: string, sectionTo: string) {
  return (
    pathname === sectionTo ||
    (sectionTo !== "/" && pathname.startsWith(`${sectionTo}/`))
  );
}
