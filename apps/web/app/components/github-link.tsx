import { links } from "@/constants";

export const GitHubLink = () => {
  return (
    <a
      className="dsy-btn dsy-btn-circle dsy-btn-ghost"
      href={links.github}
      rel="noreferrer"
      target="_blank"
    >
      <span className="sr-only">GitHub</span>
      <span className="icon-[carbon--logo-github] h-7 w-7" />
    </a>
  );
};
