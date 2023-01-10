import chalk from "chalk";
import { injectable } from "inversify";
import { createSpinner, Spinner } from "nanospinner";

@injectable()
export class Logger {
  private _spinner: Spinner;
  constructor() {
    this._spinner = createSpinner();
  }

  public loading(message: string) {
    this._spinner.start({ text: chalk.white(message) });
  }

  public success(message: string) {
    this._spinner.success({ text: message }).clear();
  }
}