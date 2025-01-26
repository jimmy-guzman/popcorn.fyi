import { createClerkHandler } from "@clerk/tanstack-start/server";
import { getRouterManifest } from "@tanstack/start/router-manifest";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/start/server";

import { createRouter } from "./router";

const startHandler = createStartHandler({
  createRouter,
  getRouterManifest,
});

// @ts-expect-error @clerk/tanstack-start/server needs an update
const clerkHandler = createClerkHandler(startHandler);

const handler = clerkHandler(defaultStreamHandler);

export default handler;
