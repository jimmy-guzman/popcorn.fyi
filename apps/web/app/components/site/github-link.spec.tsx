import { render, screen } from "@/testing/utils";

import { GitHubLink } from "./github-link";

test("should", async () => {
  await render(<GitHubLink />);

  expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
});
