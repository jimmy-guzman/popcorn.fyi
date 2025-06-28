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
            className="even:bg-base-200 flex flex-col gap-1 px-4 py-3 sm:grid sm:grid-cols-12 sm:gap-x-4"
            key={title}
          >
            <dt className="text-base-content/70 text-sm font-semibold sm:col-span-2">
              {title}
            </dt>
            <dd className="text-base-content min-w-0 text-right text-sm font-medium break-words sm:col-span-10 sm:text-left">
              {value ?? "—"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
