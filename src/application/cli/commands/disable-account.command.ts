import { Command } from "commander";
import { DIContainer } from "../../../core/di-container/di-container";
import { DisableUserAccountUseCase } from "../../../domain/useCases/DisableUserAccountUseCase";

export class DisabledAccountCommand {
  public static async build(cli: Command) {
    cli
      .command("disable-account")
      .description("Disable account to an User Pool")
      .requiredOption("-u, --username <required>", "User pool username")
      .requiredOption("-up, --userPoolId <required>", "User pool id")
      .requiredOption("--region <string>", "AWS Region", "us-east-1")
      .action(async (str) => {
        const { userPoolId, username: usernameId, region } = str;
        const disableAccountUseCase = DIContainer.resolve(
          DisableUserAccountUseCase
        );
        await disableAccountUseCase.execute({ region, userPoolId, usernameId });
      });
  }
}
