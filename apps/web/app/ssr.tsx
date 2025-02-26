import { createClerkHandler } from "@clerk/tanstack-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

import { createRouter } from "./router";

const startHandler = createStartHandler({
  createRouter,
  getRouterManifest,
});

const clerkHandler = createClerkHandler(startHandler);

const handler = clerkHandler(defaultStreamHandler);

export default handler;
