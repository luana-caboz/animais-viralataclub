import { createLogger } from "./logger";
import { ConsoleTransport } from "./console.transport";

export const logger = createLogger(
  new ConsoleTransport()
);
