export const MediaOverviewList = ({
  items,
}: {
  items: (
    | {
        title: string;
        value: number | undefined;
      }
    | {
        title: string;
        value: string | undefined;
      }
  )[];
}) => {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
