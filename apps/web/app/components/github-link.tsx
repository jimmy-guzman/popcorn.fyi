import { Button } from "@popcorn.fyi/ui/button";

import { links } from "@/constants";

export const GitHubLink = () => {
  return (
    <Button modifier="circle" variant="ghost">
      <a href={links.github} rel="noreferrer" target="_blank">
        <span className="sr-only">GitHub</span>
        <span className="icon-[lucide--github] h-5 w-5" />
      </a>
    </Button>
  );
};
