import type { ReactElement, ReactNode } from "react";

import { XIcon } from "lucide-react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DiscoverFilterRowProps {
  children: (controlId: string) => ReactNode;
  label: string;
  onReset: () => void;
  resetLabel: string;
}

export const DiscoverFilterRow = ({
  children,
  label,
  onReset,
  resetLabel,
}: DiscoverFilterRowProps): ReactElement => {
  const controlId = useId();

  return (
    <div className="flex w-full overflow-hidden rounded-lg border border-border bg-background shadow-sm">
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-3 py-2">
        <Label htmlFor={controlId}>{label}</Label>
        {children(controlId)}
      </div>
      <Button
        aria-label={resetLabel}
        className="shrink-0 rounded-none border-t-0 border-r-0 border-b-0 border-l"
        onClick={onReset}
        size="icon-sm"
        type="button"
        variant="outline"
      >
        <XIcon />
      </Button>
    </div>
  );
};
