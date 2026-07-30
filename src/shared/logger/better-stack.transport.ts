import { Logtail } from "@logtail/node";

import { LoggerTransport } from "./transport";
import { LogEntry } from "./types";

export class BetterStackTransport
  implements LoggerTransport {

  private readonly client =
    new Logtail(
      process.env.BETTER_STACK_SOURCE_TOKEN!
    );

  async send(
    entry: LogEntry
  ): Promise<void> {

    const context = {
      ...entry.metadata,
      timestamp: entry.timestamp,
    };

    switch (entry.level) {
      case "info":
        await this.client.info(
          entry.message,
          context
        );
        break;

      case "warn":
        await this.client.warn(
          entry.message,
          context
        );
        break;

      case "error":
        await this.client.error(
          entry.message,
          context
        );
        break;
    }
    await this.client.flush();
  }
}