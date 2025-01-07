import { links } from "@/constants";

export const GitHubLink = () => {
  return (
    <a
      className="dsy-btn dsy-btn-ghost"
      href={links.github}
      rel="noreferrer"
      target="_blank"
    >
      <span className="sr-only block md:not-sr-only">GitHub</span>
      <span className="icon-[lucide--github] h-5 w-5" />
    </a>
  );
};
