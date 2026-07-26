import type { ReactNode } from "react";

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
}: DiscoverFilterRowProps) => {
  const controlId = useId();

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Label htmlFor={controlId}>{label}</Label>
      <div className="flex items-center gap-1">
        <div className="min-w-0 flex-1">{children(controlId)}</div>
        <Button
          aria-label={resetLabel}
          onClick={onReset}
          size="icon-sm"
          variant="ghost"
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
};
