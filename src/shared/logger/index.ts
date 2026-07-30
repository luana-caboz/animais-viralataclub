import { createLogger } from "./logger";

import { MultiTransport } from "./multi.transport";

import { ConsoleTransport } from "./console.transport";

import { BetterStackTransport } from "./better-stack.transport";

export const logger =
  createLogger(

    new MultiTransport([

      new ConsoleTransport(),

      new BetterStackTransport(),

    ])

  );
  