import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_authed")({
  beforeLoad: ({ context }) => {
    if (!context.userId) {
      throw new Error("Not authenticated");
    }
  },
});
