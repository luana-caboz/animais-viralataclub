import { LoggerTransport } from "./transport";
import { LogEntry } from "./types";

export class ConsoleTransport
  implements LoggerTransport {

  async send(
    entry: LogEntry
  ) {

    const metadata =
      entry.metadata
        ? entry.metadata
        : "";

    switch (entry.level) {

      case "info":
        console.info(
          entry.message,
          metadata
        );
        break;

      case "warn":
        console.warn(
          entry.message,
          metadata
        );
        break;

      case "error":
        console.error(
          entry.message,
          metadata
        );
        break;
    }
  }

}
