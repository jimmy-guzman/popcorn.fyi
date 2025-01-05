import { site } from "@/config/site";

import { CastList } from "./cast-list";
import { CrewList } from "./crew-list";
import { Prose } from "./prose";

interface MediaCreditsProps {
  credits: {
    cast?: {
      character?: string;
      id: number;
      name?: string;
      profile_path?: string;
    }[];
    crew?: {
      id: number;
      job?: string;
      name?: string;
      profile_path?: string;
    }[];
  };
}

export const MediaCredits = ({
  credits: { cast = [], crew = [] },
}: MediaCreditsProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Prose>
        <h2 id="cast">{site.pages.media.credits.cast.title}</h2>
      </Prose>
      {cast.length > 0 ? (
        <CastList cast={cast} />
      ) : (
        <Prose>
          <p>{site.pages.media.credits.cast.unavailable}</p>
        </Prose>
      )}
      <div className="dsy-divider" />
      <Prose>
        <h2 id="crew">{site.pages.media.credits.crew.title}</h2>
      </Prose>
      {crew.length > 0 ? (
        <CrewList crew={crew} />
      ) : (
        <Prose>
          <p>{site.pages.media.credits.crew.unavailable}</p>
        </Prose>
      )}
    </div>
  );
};
