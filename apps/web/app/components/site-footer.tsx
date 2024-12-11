import { utils } from "@/config/urls";

export const SiteFooter = () => {
  return (
    <footer className="dsy-footer bg-base-200 text-base-content p-10">
      <aside>
        <span className="text-4xl">🍿</span>
        <p>
          © 2024{" "}
          <a
            className="dsy-link"
            href={utils.author}
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
            href={utils.tanstackStart}
            rel="noreferrer"
            target="_blank"
          >
            TanStack Start
          </a>{" "}
          and{" "}
          <a
            className="dsy-link"
            href={utils.daisyUI}
            rel="noreferrer"
            target="_blank"
          >
            daisyUI
          </a>
          . Powered by{" "}
          <a
            className="dsy-link"
            href={utils.vercel}
            rel="noreferrer"
            target="_blank"
          >
            Vercel
          </a>
          .
        </p>
        <p className="mt-8">
          Data provided by{" "}
          <a
            className="dsy-link"
            href={utils.tmdb}
            rel="noreferrer"
            target="_blank"
          >
            TMDB
          </a>
          .
        </p>
      </aside>
    </footer>
  );
};
