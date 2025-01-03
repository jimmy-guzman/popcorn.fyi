interface MediaStatusProps {
  status?: string;
}

export const MediaStatus = ({ status }: MediaStatusProps) => {
  return status ? (
    <span className="dsy-badge dsy-badge-secondary">{status}</span>
  ) : null;
};
