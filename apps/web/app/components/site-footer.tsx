import { urls } from "@/config/urls";

import { TMDBLogo } from "./tmdb-logo";

export const SiteFooter = () => {
  return (
    <footer className="dsy-footer bg-base-200 text-base-content p-10">
      <aside>
        <span className="text-4xl">🍿</span>
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
    </footer>
  );
};
