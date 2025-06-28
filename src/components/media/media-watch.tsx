import { urls } from "@/config/urls";

import { Prose } from "../shared/prose";
import { MediaProviders } from "./media-providers";

interface Provider {
  logo_path?: string;
  provider_id: number;
  provider_name?: string;
}

interface MediaWatchProps {
  watchProviders?: {
    US?: {
      ads?: Provider[];
      buy?: Provider[];
      flatrate?: Provider[];
      link?: string;
      rent?: Provider[];
    };
  };
}

export const MediaWatch = ({ watchProviders }: MediaWatchProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <Prose>
        <h2 id="providers">Providers</h2>
      </Prose>

      {watchProviders?.US ? (
        <div className="flex flex-col gap-4 md:flex-row">
          {watchProviders.US.flatrate ? (
            <MediaProviders
              providers={watchProviders.US.flatrate}
              title="stream"
            />
          ) : null}

          {watchProviders.US.ads ? (
            <MediaProviders providers={watchProviders.US.ads} title="ads" />
          ) : null}

          {watchProviders.US.buy ? (
            <MediaProviders providers={watchProviders.US.buy} title="buy" />
          ) : null}

          {watchProviders.US.rent ? (
            <MediaProviders providers={watchProviders.US.rent} title="rent" />
          ) : null}
        </div>
      ) : (
        <p>No providers available.</p>
      )}

      <aside>
        <Prose>
          <p>
            Data provided by{" "}
            <a href={urls.JustWatch} rel="noreferrer" target="_blank">
              <img
                alt="JustWatch"
                className="inline h-[10px] w-[70px] align-middle"
                src={urls.JustWatchLogo}
              />
            </a>
          </p>
        </Prose>
      </aside>
    </div>
  );
};
