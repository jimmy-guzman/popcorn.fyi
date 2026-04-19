import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@/components/ui/table";
import { hasKey } from "@/lib/predicates";
import { tmdbImageUrl } from "@/lib/tmdb-images";

interface MediaProvidersProps {
  providers: {
    logo_path?: string;
    provider_id?: number;
    provider_name?: string;
  }[];
  title: "ads" | "buy" | "rent" | "stream";
}

export const MediaProviders = ({ providers, title }: MediaProvidersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <UITable>
        <TableHeader>
          <TableRow>
            <TableHead className="text-base uppercase">{title}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.filter(hasKey("provider_id")).map((provider) => {
            const trimmed = provider.provider_name?.trim() ?? "";
            const label = trimmed === "" ? "Unknown Provider" : trimmed;

            return provider.logo_path ? (
              <TableRow key={provider.provider_id}>
                <TableCell className="text-base">
                  <div className="flex items-center gap-3">
                    <div className="size-14 shrink-0 overflow-hidden rounded-xl border border-border">
                      <img
                        alt={label}
                        className="size-full object-cover"
                        src={tmdbImageUrl(provider.logo_path)}
                      />
                    </div>
                    <div>
                      <div className="font-bold">{label}</div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : null;
          })}
        </TableBody>
      </UITable>
    </div>
  );
};
