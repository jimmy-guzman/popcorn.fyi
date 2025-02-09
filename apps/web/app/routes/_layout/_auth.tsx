import { createFileRoute } from "@tanstack/react-router";

import { userFn } from "@/lib/user";

export const Route = createFileRoute("/_layout/_auth")({
  beforeLoad: async () => {
    const { userId } = await userFn();

    if (!userId) {
      throw new Error("Not authenticated");
    }

    return {
      userId,
    };
  },
});
