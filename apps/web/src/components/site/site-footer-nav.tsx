import { urls } from "@/config/urls";

export const SiteFooterNav = () => {
  return (
    <nav>
      <h6 className="dsy-footer-title sr-only">Social</h6>
      <div className="grid grid-flow-col gap-2">
        <a
          aria-label="Github"
          className="dsy-btn"
          href={urls.github}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">GitHub</span>
          <span className="icon-[lucide--github] h-5 w-5" />
        </a>
        <a
          aria-label="Report a bug"
          className="dsy-btn"
          href={`${urls.github}/issues`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">Report a bug</span>
          <span className="icon-[lucide--bug] h-5 w-5" />
        </a>
      </div>
    </nav>
  );
};
