export const ExpandedPlotSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="dsy-skeleton h-6 w-40" />
      <div className="bg-base-300 border-base-200 flex items-center justify-between rounded-lg border px-4 py-2">
        <div className="dsy-skeleton h-4 w-32" />
        <div className="dsy-skeleton h-5 w-12 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="dsy-skeleton h-4 w-full" />
        <div className="dsy-skeleton h-4 w-5/6" />
        <div className="dsy-skeleton h-4 w-4/6" />
      </div>
      <div className="dsy-skeleton h-6 w-24 rounded-md" />
    </div>
  );
};
