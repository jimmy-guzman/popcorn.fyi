import { Button } from "@popcorn.fyi/ui/button";

import { links } from "@/constants";

export const GitHubLink = () => {
  return (
    <Button asChild>
      <a href={links.github} rel="noreferrer" target="_blank">
        <span className="sr-only md:not-sr-only">GitHub</span>
        <span className="icon-[lucide--github] h-5 w-5" />
      </a>
    </Button>
  );
};
