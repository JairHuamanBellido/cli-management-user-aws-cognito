import { Command } from "commander";
import { DIContainer } from "../../../core/di-container/di-container";
import { GetAllUsersUseCase } from "../../../domain/useCases/GetAllUserUseCase";

export class ListUserCommand {
  public static async build(cli: Command) {
    cli
      .command("list-user")
      .description("List all user")
      .requiredOption("-pool, --userPoolId <required>", "User pool id")
      .requiredOption("-r,--region <required>", "AWS Region", "us-east-1")
      .action(async (str) => {
        const { region, userPoolId } = str;
        const getAllUserUseCase = DIContainer.resolve(GetAllUsersUseCase);

        await getAllUserUseCase.execute({ region, userPoolId });
      });
  }
}
