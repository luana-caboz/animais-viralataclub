import { LoggerTransport } from "./transport";
import {
  LogEntry,
  LogLevel,
  LogMetadata,
} from "./types";

export function createLogger(
  transport: LoggerTransport
) {
  function send(
    level: LogLevel,
    message: string,
    metadata?: LogMetadata
  ): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };
    
    void transport.send(entry);
  }

  return {
    info(
      message: string,
      metadata?: LogMetadata
    ): void {
      send("info", message, metadata);
    },

    warn(
      message: string,
      metadata?: LogMetadata
    ): void {
      send("warn", message, metadata);
    },

    error(
      message: string,
      metadata?: LogMetadata
    ): void {
      send("error", message, metadata);
    },
  };
}