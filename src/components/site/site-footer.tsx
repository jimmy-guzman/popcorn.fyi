import { PopcornIcon } from "lucide-react";

import { urls } from "@/config/urls";

import { TMDBLogo } from "../icons/tmdb-logo";
import { WikidataLogo } from "../icons/wikipedia-logo";
import { SiteFooterNav } from "./site-footer-nav";

const footerProseLinkClassName =
  "text-primary underline-offset-4 transition-colors hover:underline";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-6 text-sm text-muted-foreground sm:py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-baseline lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4">
          <PopcornIcon className="size-10 shrink-0" />
          <p>
            © <time dateTime={currentYear.toString()}>{currentYear}</time>{" "}
            <a
              className={footerProseLinkClassName}
              href={urls.author}
              rel="noreferrer"
              target="_blank"
            >
              Jimmy Guzman Moreno
            </a>{" "}
            — All rights reserved.
          </p>

          <p>
            Built with{" "}
            <a
              className={footerProseLinkClassName}
              href={urls.tanstackStart}
              rel="noreferrer"
              target="_blank"
            >
              TanStack Start
            </a>{" "}
            and{" "}
            <a
              className={footerProseLinkClassName}
              href={urls.shadcnUI}
              rel="noreferrer"
              target="_blank"
            >
              shadcn/ui
            </a>
            . Powered by{" "}
            <a
              className={footerProseLinkClassName}
              href={urls.vercel}
              rel="noreferrer"
              target="_blank"
            >
              Vercel
            </a>
            .
          </p>
          <p>
            Data provided by{" "}
            <a
              aria-label="TMDB Logo"
              className={footerProseLinkClassName}
              href={urls.tmdb}
              rel="noreferrer"
              target="_blank"
            >
              <TMDBLogo className="mr-1 inline h-4 w-auto" />
            </a>
            and{" "}
            <a
              aria-label="Wikidata Logo"
              className={footerProseLinkClassName}
              href={urls.wikidata}
              rel="noreferrer"
              target="_blank"
            >
              <WikidataLogo className="inline h-5 w-auto" />
            </a>
            .
          </p>
          <small className="mt-4 block text-xs leading-relaxed">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </small>
          <small className="block text-xs leading-relaxed">
            This product uses data from Wikidata but is not endorsed or
            certified by Wikidata.
          </small>
        </div>
        <SiteFooterNav />
      </div>
    </footer>
  );
};
