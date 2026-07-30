import { LogEntry } from "./types";

export interface LoggerTransport {

  send(
    entry: LogEntry
  ): Promise<void>;
}