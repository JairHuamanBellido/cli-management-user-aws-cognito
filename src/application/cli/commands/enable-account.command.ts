import { Command } from "commander";
import { DIContainer } from "../../../core/di-container/di-container";
import { EnableUserAccountUseCase } from "../../../domain/useCases/EnableUserAccountUseCase";

export class EnableAccountCommand {
  public static async build(cli: Command) {
    cli
      .command("enable-account")
      .description("Enable account to an User Pool")
      .requiredOption("-u, --username <required>", "User pool username")
      .requiredOption("-up, --userPoolId <required>", "User pool id")
      .requiredOption("--region <string>", "AWS Region", "us-east-1")
      .action(async (str) => {
        const { userPoolId, username: usernameId, region } = str;
        const enableAccountUseCase = DIContainer.resolve(
          EnableUserAccountUseCase
        );
        await enableAccountUseCase.execute({ region, userPoolId, usernameId });
      });
  }
}
