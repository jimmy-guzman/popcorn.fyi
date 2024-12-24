import { ListContent } from "./list-content";
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
      <ListContent>
        {people.map((person) => {
          return <PersonCard key={person.id} person={person} />;
        })}
      </ListContent>
    </div>
  );
};
