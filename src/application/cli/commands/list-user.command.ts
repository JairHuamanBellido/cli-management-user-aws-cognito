import { Command } from "commander";
import { DIContainer } from "../../../core/di-container";
import { GetAllUsers } from "../../../domain/services/GetAllUser.service";

export class ListUserCommand {
  public static async build(cli: Command) {
    cli
      .command("list-user")
      .description("List all user")
      .requiredOption("-pool, --userPoolId <required>", "User pool id")
      .requiredOption("-r,--region <required>", "AWS Region", "us-east-1")
      .action(async (str) => {
        const { region, userPoolId } = str;
        const getAllUserService = DIContainer.resolve(GetAllUsers);

        await getAllUserService.execute(region, userPoolId);
      });
  }
}
