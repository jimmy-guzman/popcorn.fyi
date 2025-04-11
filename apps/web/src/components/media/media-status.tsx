import { Badge } from "@popcorn.fyi/ui/badge";

interface MediaStatusProps {
  status?: string;
}

export const MediaStatus = ({ status }: MediaStatusProps) => {
  return status ? <Badge color="secondary">{status}</Badge> : null;
};
