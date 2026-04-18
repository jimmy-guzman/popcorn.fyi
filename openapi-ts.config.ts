import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig([
  {
    input: "https://developer.themoviedb.org/openapi/tmdb-api.json",
    output: {
      entryFile: false,
      path: "src/integrations/tmdb/gen",
    },
  },
  {
    input: "https://www.wikidata.org/w/rest.php/wikibase/v1/openapi.json",
    output: {
      entryFile: false,
      path: "src/integrations/wikidata/gen",
    },
  },
]);
