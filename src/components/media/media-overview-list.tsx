interface MediaOverviewListProps {
  items: {
    title: string;
    value?: number | React.ReactNode | string;
  }[];
}

export const MediaOverviewList = ({ items }: MediaOverviewListProps) => {
  return (
    <dl className="divide-y divide-border overflow-hidden rounded border border-border">
      {items.map(({ title, value }) => {
        return (
          <div
            className="group flex flex-col gap-1 px-4 py-3 even:bg-muted sm:grid sm:grid-cols-12 sm:gap-x-4"
            key={title}
          >
            <dt className="text-sm font-semibold text-foreground group-even:text-muted-foreground sm:col-span-2">
              {title}
            </dt>
            <dd className="min-w-0 text-right text-sm font-medium wrap-break-word text-foreground group-even:text-muted-foreground sm:col-span-10 sm:text-left">
              {value ?? "—"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
