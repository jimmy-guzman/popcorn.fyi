import { tmdbImageUrl } from "@popcorn.fyi/tmdb";

interface MediaProvidersProps {
  providers: {
    logo_path?: string;
    provider_id: number;
    provider_name?: string;
  }[];
  title: "ads" | "buy" | "rent" | "stream";
}

export const MediaProviders = ({ providers, title }: MediaProvidersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="overflow-x-auto">
        <table className="dsy-table dsy-table-lg">
          <thead>
            <tr>
              <th className="uppercase">{title}</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => {
              return provider.logo_path ? (
                <tr key={provider.provider_id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="dsy-avatar">
                        <div className="w-14 rounded-xl">
                          <img
                            alt={provider.provider_name}
                            src={tmdbImageUrl(provider.logo_path)}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {provider.provider_name}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
