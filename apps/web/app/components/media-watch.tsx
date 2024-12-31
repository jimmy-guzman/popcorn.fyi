import { urls } from "@/config/urls";

import { MediaProviders } from "./media-providers";
import { Prose } from "./prose";

interface MediaWatchProps {
  watchProviders: {
    US?: {
      buy?: {
        logo_path?: string;
        provider_id: number;
        provider_name?: string;
      }[];
      flatrate?: {
        logo_path?: string;
        provider_id: number;
        provider_name?: string;
      }[];
      link?: string;
      rent?: {
        logo_path?: string;
        provider_id: number;
        provider_name?: string;
      }[];
    };
  };
}

export const MediaWatch = ({ watchProviders }: MediaWatchProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <Prose>
        <h2 id="providers">Providers</h2>
      </Prose>

      {watchProviders.US ? (
        <div className="flex flex-col gap-4 md:flex-row">
          {watchProviders.US.flatrate ? (
            <MediaProviders
              kind="stream"
              providers={watchProviders.US.flatrate}
            />
          ) : null}

          {watchProviders.US.buy ? (
            <MediaProviders kind="buy" providers={watchProviders.US.buy} />
          ) : null}

          {watchProviders.US.rent ? (
            <MediaProviders kind="rent" providers={watchProviders.US.rent} />
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
                src="https://widget.justwatch.com/assets/JW_logo_color_10px.svg"
              />
            </a>
          </p>
        </Prose>
      </aside>
    </div>
  );
};
