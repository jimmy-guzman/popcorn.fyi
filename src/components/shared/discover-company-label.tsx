import { useQuery } from "@tanstack/react-query";

import { companyOptions } from "@/data/company";

interface DiscoverCompanyLabelProps {
  id: string;
}

/**
 * Companies are a deep-link-only filter, so the chip receives an id rather than
 * a name. Resolve it lazily and show the id until the name arrives.
 */
export const DiscoverCompanyLabel = ({ id }: DiscoverCompanyLabelProps) => {
  const { data } = useQuery(companyOptions(id));

  return data?.name ?? id;
};
