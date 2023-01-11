import chalk from "chalk";
import { injectable } from "inversify";

@injectable()
export class Logger {
  constructor() {}
  public info(message: string) {
    console.log(this.currentTime() + chalk.white(message));
  }

  public success(message: string) {
    console.log(chalk.white(this.currentTime() + chalk.greenBright(message)));
  }

  public error(message: string) {
    console.log(
      chalk.white(this.currentTime() + chalk.bgRedBright.whiteBright(message))
    );
  }

  public warn(message: string) {
    console.log(this.currentTime() + chalk.yellowBright(message));
  }

  private currentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return chalk.blue(`~ ${hours}:${minute}:${seconds} | `);
  }
}
