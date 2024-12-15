import { tmdbImageUrl } from "@popcorn.fyi/tmdb";

export const PersonCard = ({
  person,
}: {
  person: {
    id: number;
    known_for_department?: string;
    name?: string;
    profile_path?: string;
  };
}) => {
  return (
    <div className="dsy-card bg-base-100 shadow-xl" key={person.id}>
      {person.profile_path ? (
        <figure>
          <img
            alt={person.name}
            src={tmdbImageUrl(person.profile_path, "w500")}
          />
        </figure>
      ) : null}
      <div className="dsy-card-body">
        <h2 className="dsy-card-title">{person.name}</h2>
        <p>Known for {person.known_for_department}</p>
        <div className="dsy-card-actions justify-end">
          <button
            className="dsy-btn dsy-btn-secondary dsy-btn-sm"
            type="button"
          >
            Details <span className="icon-[lucide--arrow-right] h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
