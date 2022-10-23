import { setupWorker } from "msw";

import { handlers } from "./handlers";

export const serverWorker = setupWorker(...handlers);
