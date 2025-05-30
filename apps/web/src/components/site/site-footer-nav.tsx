import { Button } from "@popcorn.fyi/ui/button";

import { links } from "@/constants";

export const SiteFooterNav = () => {
  return (
    <nav>
      <h6 className="dsy-footer-title sr-only">Social</h6>
      <div className="grid grid-flow-col gap-2">
        <Button asChild>
          <a
            aria-label="Github"
            href={links.github}
            rel="noreferrer"
            target="_blank"
          >
            <span className="sr-only md:not-sr-only">GitHub</span>
            <span className="icon-[lucide--github] h-5 w-5" />
          </a>
        </Button>
        <Button asChild>
          <a
            aria-label="Storybook"
            href={links.storybook}
            rel="noreferrer"
            target="_blank"
          >
            <span className="sr-only md:not-sr-only">Storybook</span>
            <span className="icon-[simple-icons--storybook] h-5 w-5" />
          </a>
        </Button>
      </div>
    </nav>
  );
};
