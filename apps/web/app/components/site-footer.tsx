import { urls } from "@/config/urls";

import { GitHubLink } from "./github-link";
import { SiteLogo } from "./site-logo";
import { TMDBLogo } from "./tmdb-logo";

export const SiteFooter = () => {
  return (
    <footer className="dsy-footer bg-base-200 text-base-content p-10">
      <aside>
        <SiteLogo classname="h-12 w-12" />
        <p>
          © 2024{" "}
          <a
            className="dsy-link"
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
            className="dsy-link"
            href={urls.tanstackStart}
            rel="noreferrer"
            target="_blank"
          >
            TanStack Start
          </a>{" "}
          and{" "}
          <a
            className="dsy-link"
            href={urls.daisyUI}
            rel="noreferrer"
            target="_blank"
          >
            daisyUI
          </a>
          . Powered by{" "}
          <a
            className="dsy-link"
            href={urls.vercel}
            rel="noreferrer"
            target="_blank"
          >
            Vercel
          </a>
          ,{" "}
          <a
            className="dsy-link"
            href={urls.clerk}
            rel="noreferrer"
            target="_blank"
          >
            Clerk
          </a>{" "}
          and{" "}
          <a
            className="dsy-link"
            href={urls.neon}
            rel="noreferrer"
            target="_blank"
          >
            Neon
          </a>
          .
        </p>
        <p>
          Data provided by{" "}
          <a href={urls.tmdb} rel="noreferrer" target="_blank">
            <TMDBLogo />
          </a>
        </p>
        <p className="mt-8">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </aside>
      <nav>
        <h6 className="dsy-footer-title sr-only">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <GitHubLink />
        </div>
      </nav>
    </footer>
  );
};
