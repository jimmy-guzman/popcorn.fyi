interface MediaOverviewListProps {
  items: {
    title: string;
    value?: number | React.ReactNode | string;
  }[];
}

export const MediaOverviewList = ({ items }: MediaOverviewListProps) => {
  return (
    <dl className="rounded-box border-base-300 divide-base-200 divide-y overflow-hidden border">
      {items.map(({ title, value }) => {
        return (
          <div
            className="even:bg-base-200 grid grid-cols-12 gap-x-4 px-4 py-3"
            key={title}
          >
            <dt className="text-base-content/70 col-span-2 truncate text-sm font-semibold">
              {title}
            </dt>
            <dd className="text-base-content col-span-10 min-w-0 break-words text-right text-sm font-medium sm:text-left">
              {value ?? "—"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
