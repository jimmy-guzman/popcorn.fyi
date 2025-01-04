import { Prose } from "./prose";

interface MediaOverviewListProps {
  items: {
    title: string;
    value?: number | React.JSX.Element[] | string;
  }[];
}

export const MediaOverviewList = ({ items }: MediaOverviewListProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:gap-8">
      {items.map((item) => {
        return (
          <div className="w-full p-8" key={item.title}>
            <Prose>
              <h2>{item.title}</h2>
              <p>{item.value}</p>
            </Prose>
          </div>
        );
      })}
    </div>
  );
};
