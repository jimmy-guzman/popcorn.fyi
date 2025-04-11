import { Button } from "@popcorn.fyi/ui/button";

interface ExpandMoreLessProps {
  handleExpand: React.Dispatch<React.SetStateAction<number>>;
  isExpanded: number;
  summaryLength?: number;
}

export const ExpandMoreLess = ({
  handleExpand,
  isExpanded,
  summaryLength = 0,
}: ExpandMoreLessProps) => {
  if (summaryLength <= 1) return null;

  return (
    <div className="flex justify-start gap-2">
      {summaryLength > isExpanded && (
        <Button
          onClick={() => {
            handleExpand((prev) => Math.min(prev + 1, summaryLength));
          }}
          variant="ghost"
        >
          Read More
          <span className="icon-[lucide--chevron-down] h-4 w-4" />
        </Button>
      )}
      {isExpanded > 1 && (
        <Button
          onClick={() => {
            handleExpand(1);
          }}
          variant="ghost"
        >
          Read Less
          <span className="icon-[lucide--chevron-up] h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
