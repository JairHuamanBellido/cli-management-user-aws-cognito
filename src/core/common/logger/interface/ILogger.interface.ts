import { Spinner } from "nanospinner";

export interface ILogger {
  print(spinner: Spinner, message: string): void;
}
