interface MediaOverviewListProps {
  items: {
    title: string;
    value?: number | React.ReactNode | string;
  }[];
}

export const MediaOverviewList = ({ items }: MediaOverviewListProps) => {
  return (
    <dl className="divide-y divide-base-200 overflow-hidden rounded-box border border-base-300">
      {items.map(({ title, value }) => {
        return (
          <div
            className="flex flex-col gap-1 px-4 py-3 even:bg-base-200 sm:grid sm:grid-cols-12 sm:gap-x-4"
            key={title}
          >
            <dt className="text-sm font-semibold text-base-content/70 sm:col-span-2">
              {title}
            </dt>
            <dd className="min-w-0 text-right text-sm font-medium break-words text-base-content sm:col-span-10 sm:text-left">
              {value ?? "—"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
