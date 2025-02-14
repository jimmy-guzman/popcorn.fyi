interface MediaOverviewListProps {
  items: {
    title: string;
    value?: number | React.JSX.Element[] | string;
  }[];
}

export const MediaOverviewList = ({ items }: MediaOverviewListProps) => {
  return (
    <ul className="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
      {items.map((item) => {
        return (
          <li className="flex flex-col gap-0.5" key={item.title}>
            <span className="text-base-content/70 text-xs font-medium uppercase tracking-normal">
              {item.title}
            </span>
            <span className="text-base-content text-base">
              {item.value ?? "—"}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
