import { config } from "@dotenvx/dotenvx";
import pc from "picocolors";
import * as v from "valibot";

const schema = v.object({
  CLERK_SECRET_KEY: v.string(),
  COMPATIBILITY_DATE: v.string(),
  TMDB_API_KEY: v.string(),
  TMDB_API_TOKEN: v.string(),
  VITE_CLERK_PUBLISHABLE_KEY: v.string(),
});

const validate = () => {
  config({ ignore: ["MISSING_ENV_FILE"], quiet: true });

  if (process.env["CI"]) {
    return process.env as v.InferInput<typeof schema>;
  }

  const parsed = v.safeParse(schema, process.env);

  if (!parsed.success) {
    // eslint-disable-next-line no-console -- This is ok.
    console.error(
      pc.red("Invalid environment variables:"),
      v.flatten(parsed.issues).nested,
    );

    process.exit(1);
  }

  return parsed.output;
};

export default validate();
