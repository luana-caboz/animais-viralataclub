export type LogLevel =
  | "info"
  | "warn"
  | "error";

export type LogMetadata = {

  module?: string;

  syncId?: string;

  [key: string]: unknown;

};

export type LogEntry = {
    level: LogLevel;
    message: string;
    timestamp: string;
    metadata?: LogMetadata;
};