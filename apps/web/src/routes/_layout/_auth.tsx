import { createFileRoute, redirect } from "@tanstack/react-router";

import { userFn } from "@/api/user.details";

export const Route = createFileRoute("/_layout/_auth")({
  beforeLoad: async ({ location }) => {
    const { userId } = await userFn();

    if (!userId) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- can be thrown
      throw redirect({
        search: {
          redirectUrl: location.href,
        },
        to: "/sign-in",
      });
    }

    return {
      userId,
    };
  },
});
