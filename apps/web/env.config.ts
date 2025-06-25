import { config } from "@dotenvx/dotenvx";
import pc from "picocolors";
import * as v from "valibot";

const schema = v.object({
  KV_REST_API_TOKEN: v.string(),
  KV_REST_API_URL: v.string(),
  TMDB_API_TOKEN: v.string(),
});

function getEnvironmentConfig() {
  config({ ignore: ["MISSING_ENV_FILE"], quiet: true });

  if (process.env.CI && !process.env.PLAYWRIGHT) {
    return process.env as v.InferInput<typeof schema>;
  }

  const parsed = v.safeParse(schema, process.env);

  if (!parsed.success) {
    // eslint-disable-next-line no-console -- This is ok.
    console.error(
      pc.red("Invalid environment variables:"),
      v.flatten(parsed.issues).nested,
    );

    throw new Error(
      "Invalid environment variables",
      v.flatten(parsed.issues).nested,
    );
  }

  return parsed.output;
}

const envConfig = getEnvironmentConfig();

export default envConfig;
