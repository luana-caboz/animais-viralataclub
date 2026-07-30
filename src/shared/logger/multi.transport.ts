import { LoggerTransport } from "./transport";
import { LogEntry } from "./types";

export class MultiTransport
  implements LoggerTransport {

  constructor(
    private readonly transports: LoggerTransport[]
  ) {}

  async send(
    entry: LogEntry
  ): Promise<void> {

    await Promise.allSettled(
      this.transports.map((transport) =>
        transport.send(entry)
      )
    );
  }
}