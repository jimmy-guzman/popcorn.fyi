import { BugIcon } from "lucide-react";

import { urls } from "@/config/urls";

const footerNavLinkClassName =
  "inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline";

export const SiteFooterNav = () => {
  return (
    <nav aria-label="Social and feedback" className="shrink-0 lg:text-right">
      <h6 className="sr-only">Social</h6>
      <div className="flex flex-wrap items-center gap-5 text-sm">
        <a
          aria-label="Github"
          className={footerNavLinkClassName}
          href={urls.github}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">GitHub</span>
          <span aria-hidden className="icon-[simple-icons--github] size-4" />
        </a>
        <a
          aria-label="Report a bug"
          className={footerNavLinkClassName}
          href={`${urls.github}/issues`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">Report a bug</span>
          <BugIcon className="size-4" />
        </a>
      </div>
    </nav>
  );
};
