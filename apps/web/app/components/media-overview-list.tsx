interface MediaOverviewListProps {
  items: {
    title: string;
    value: number | React.JSX.Element[] | string | undefined;
  }[];
}

export const MediaOverviewList = ({ items }: MediaOverviewListProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:gap-8">
      {items.map((item) => {
        return (
          <div className="dsy-card" key={item.title}>
            <div className="dsy-card-body">
              <h2 className="dsy-card-title">{item.title}</h2>
              <p>{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
