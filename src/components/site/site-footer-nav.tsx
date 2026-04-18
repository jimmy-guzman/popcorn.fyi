import { buttonVariants } from "@/components/ui/button";
import { urls } from "@/config/urls";
import { cn } from "@/lib/cn";

export const SiteFooterNav = () => {
  return (
    <nav>
      <h6 className="sr-only">Social</h6>
      <div className="grid grid-flow-col gap-2">
        <a
          aria-label="Github"
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
          )}
          href={urls.github}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">GitHub</span>
          <span className="icon-[lucide--github] size-5" />
        </a>
        <a
          aria-label="Report a bug"
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
          )}
          href={`${urls.github}/issues`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">Report a bug</span>
          <span className="icon-[lucide--bug] size-5" />
        </a>
      </div>
    </nav>
  );
};
