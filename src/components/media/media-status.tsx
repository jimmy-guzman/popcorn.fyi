import { Badge } from "@/components/ui/badge";

interface MediaStatusProps {
  status?: string;
}

export const MediaStatus = ({ status }: MediaStatusProps) => {
  return status ? <Badge variant="secondary">{status}</Badge> : null;
};
