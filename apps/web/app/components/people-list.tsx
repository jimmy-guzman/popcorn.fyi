import { PersonCard } from "./person-card";

export const PeopleList = ({
  description,
  people,
  title,
}: {
  description: string;
  people: {
    id: number;
    known_for_department?: string;
    name?: string;
    profile_path?: string;
  }[];
  title: string;
}) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="prose dsy-prose">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="grid min-h-[calc(100vh-8rem)] place-content-center content-center justify-center md:grid-cols-2 md:gap-2 lg:grid-cols-5 lg:gap-4">
        {people.map((person) => {
          return <PersonCard key={person.id} person={person} />;
        })}
      </div>
    </div>
  );
};
