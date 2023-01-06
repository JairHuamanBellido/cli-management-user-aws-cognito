import chalk from "chalk";
import { Command } from "commander";
import { createSpinner } from "nanospinner";
import { DIContainer } from "../../../core/di-container";
import { DisableUserAccount } from "../../../domain/services/DisableUserAccount.service";

export class DisabledAccountCommand {
  public static async build(cli: Command) {
    cli
      .command("disable-account")
      .description("Disable account to an User Pool")
      .requiredOption("-u, --username <required>", "User pool username")
      .requiredOption("-up, --userPoolId <required>", "User pool id")
      .requiredOption("--region <string>", "AWS Region", "us-east-1")
      .action(async (str) => {
        const { userPoolId, username, region } = str;
        const disableAccountService = DIContainer.resolve(DisableUserAccount);
        const spinner = createSpinner(
          chalk.white("Enabling account for user " + username)
        ).start();

        await disableAccountService
          .execute(region, userPoolId, username)
          .then(() => {
            const successLogText = chalk.green(" [SUCCESS] ");
            const usernameLogText = chalk.cyan(username);
            const message = chalk.white(
              `${successLogText} The account of ${usernameLogText} has been disabled!`
            );
            spinner.success({ text: message }).clear();
          });
      });
  }
}
