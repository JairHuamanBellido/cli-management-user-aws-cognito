import chalk from "chalk";
import { Command } from "commander";
import { createSpinner } from "nanospinner";
import { DIContainer } from "../../../core/di-container";
import { EnableUserAccount } from "../../../domain/services/EnableUserAccount.service";

export class EnableAccountCommand {
  public static async build(cli: Command) {
    cli
      .command("enable-account")
      .description("Enable account to an User Pool")
      .requiredOption("-u, --username <required>", "User pool username")
      .requiredOption("-up, --userPoolId <required>", "User pool id")
      .requiredOption("--region <string>", "AWS Region", "us-east-1")
      .action(async (str) => {
        const { userPoolId, username, region } = str;
        const enableAccountService = DIContainer.resolve(EnableUserAccount);
        const spinner = createSpinner(
          chalk.white("Enabling account for user " + username)
        ).start();

        await enableAccountService
          .execute(region, userPoolId, username)
          .then(() => {
            const successLogText = chalk.green(" [SUCCESS] ");
            const usernameLogText = chalk.cyan(username);
            const message = chalk.white(
              `${successLogText} The account of ${usernameLogText} has been enabled!`
            );
            spinner.success({ text: message }).clear();
          });
      });
  }
}
