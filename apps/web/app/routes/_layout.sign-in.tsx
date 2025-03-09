import { SignIn } from "@clerk/tanstack-start";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import * as v from "valibot";

export const Route = createFileRoute("/_layout/sign-in")({
  validateSearch: v.object({ redirectUrl: v.optional(v.string()) }),
  component: RouteComponent,
});

function RouteComponent() {
  const { redirectUrl } = Route.useSearch();
  const location = useLocation();

  const isOnLoginPage = location.pathname === "/sign-in";

  return (
    <div className="-mt-17 flex min-h-screen items-center justify-center">
      {isOnLoginPage ? (
        <SignIn forceRedirectUrl={redirectUrl} withSignUp />
      ) : null}
    </div>
  );
}
