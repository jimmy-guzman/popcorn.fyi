import { urls } from "@/config/urls";

import { SiteLogo } from "../icons/site-logo";
import { TMDBLogo } from "../icons/tmdb-logo";
import { WikidataLogo } from "../icons/wikipedia-logo";
import { SiteFooterNav } from "./site-footer-nav";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="grid grid-cols-1 gap-8 p-10 text-foreground lg:grid-cols-2">
      <aside>
        <SiteLogo className="h-12 w-12" />
        <p>
          © <time dateTime={currentYear.toString()}>{currentYear}</time>{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
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
            className="text-primary underline-offset-4 hover:underline"
            href={urls.tanstackStart}
            rel="noreferrer"
            target="_blank"
          >
            TanStack Start
          </a>{" "}
          and{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href={urls.shadcnUI}
            rel="noreferrer"
            target="_blank"
          >
            shadcn/ui
          </a>
          . Powered by{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
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
            href={urls.tmdb}
            rel="noreferrer"
            target="_blank"
          >
            <TMDBLogo className="mr-1 inline h-4 w-auto" />
          </a>
          and{" "}
          <a
            aria-label="Wikidata Logo"
            href={urls.wikidata}
            rel="noreferrer"
            target="_blank"
          >
            <WikidataLogo className="inline h-5 w-auto" />
          </a>
          .
        </p>
        <p className="mt-8">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <p className="mt-2">
          This product uses data from Wikidata but is not endorsed or certified
          by Wikidata.
        </p>
      </aside>
      <SiteFooterNav />
    </footer>
  );
};
