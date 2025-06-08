import { getRouterManifest } from "@tanstack/react-start/router-manifest";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

import { createRouter } from "./router";

const handler = createStartHandler({
  createRouter,
  getRouterManifest,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- TODO: fix me
})(defaultStreamHandler);

export default handler;
