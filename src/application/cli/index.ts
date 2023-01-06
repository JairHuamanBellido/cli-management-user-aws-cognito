import { Command } from "commander";
import { DisabledAccountCommand } from "./commands/disable-account.command";
import { EnableAccountCommand } from "./commands/enable-account.command";
import { ListUserCommand } from "./commands/list-user.command";
const cli = new Command();

cli
  .name("Horus")
  .description("Manage user pools from AWS Cognito")
  .version("0.0.1");

EnableAccountCommand.build(cli);
DisabledAccountCommand.build(cli);
ListUserCommand.build(cli);

export { cli };
