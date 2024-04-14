// logger.ts
import { createLogger, format, transports, Logger } from "winston";

const { combine, timestamp, printf, colorize, simple, errors, json } = format;

const logFormat = printf(({ level, message, timestamp, stack }: any) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

export const logger: Logger = createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console({
      format: combine(colorize(), simple()),
    }),
  ],
});

if (process.env.NODE_ENV === "production") {
  logger.level = "warn";
}
