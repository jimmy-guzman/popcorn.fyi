import { ListContent } from "../shared/list-content";
import { Prose } from "../shared/prose";
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
      <Prose>
        <h1>{title}</h1>
        <p>{description}</p>
      </Prose>
      <ListContent>
        {people.map((person) => {
          return <PersonCard key={person.id} person={person} />;
        })}
      </ListContent>
    </div>
  );
};
