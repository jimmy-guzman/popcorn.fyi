import { getAuth } from "@clerk/tanstack-start/server";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "vinxi/http";

export const userFn = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  return {
    userId,
  };
});
