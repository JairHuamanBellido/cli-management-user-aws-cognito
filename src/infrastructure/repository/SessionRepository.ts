import chalk from "chalk";
import { inject, injectable } from "inversify";
import { cli } from "../../application/cli";
import { Logger } from "../../core/common/logger/Logger";
import { DITokens } from "../../core/di-container/di-tokens";
import { DynamoDBRepository } from "./DynamoDBRepository";

@injectable()
export class SessionRepository extends DynamoDBRepository {
  private readonly tableName: string = "aws-cognito-authentication-session";

  constructor(
    @inject(DITokens.Logger)
    private readonly _logger: Logger
  ) {
    super();
  }

  async findByUserId(user_id: string): Promise<any> {
    this._logger.info(`Checking if user ${user_id} is conected`);
    const session = await this._db
      .scan({
        TableName: this.tableName,
        FilterExpression: "user_id = :user_id",
        ExpressionAttributeValues: { ":user_id": user_id },
      })
      .promise();

    if ((session.Items as Array<unknown>).length > 0) {
      this._logger.success(`User ${user_id} is online`);
      return (session.Items as Array<unknown>)[0];
    } else {
      this._logger.error(`User ${user_id} is offline`);
      return;
    }
  }
}
