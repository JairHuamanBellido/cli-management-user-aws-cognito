import { inject, injectable } from "inversify";
import { Logger } from "../../core/common/logger/Logger";
import { DITokens } from "../../core/di-container/di-tokens";
import { UserDomain } from "../../domain/entities/user";
import { ICognitoBaseParams } from "../../domain/interface/ICognitoBaseParams.interface";
import { IManagementAccount } from "../../domain/interface/IManagementAccount.interface";
import { AWSCognitoAdapter } from "../adapter/AWSCognito.adapter";
import { IAWSCognitoPoolRepository } from "../interface/IAWSCognitoPoolRepository";
import { CognitoUserMapper } from "../mapper/CognitoUserMapper";

@injectable()
export class CognitoPoolRepository implements IAWSCognitoPoolRepository {
  constructor(@inject(DITokens.Logger) private readonly _logger: Logger) {}

  /**
   * Enable account status of Cognito User
   * @param IManagementAccount
   */
  async enableAccount({
    region,
    userPoolId,
    usernameId,
  }: IManagementAccount): Promise<void> {
    const cognito = await AWSCognitoAdapter.serviceProvider({ region });

    this._logger.info("Enabling account for user " + usernameId);
    await cognito
      .adminEnableUser({ Username: usernameId, UserPoolId: userPoolId })
      .promise()
      .then(() => {
        this._logger.success(`The account of ${usernameId} has been enabled!`);
      });
  }

  /**
   * Disable account status of Cognito User
   * @param IManagementAccount
   */
  async disableAccount({
    region,
    userPoolId,
    usernameId,
  }: IManagementAccount): Promise<void> {
    const cognito = await AWSCognitoAdapter.serviceProvider({ region });

    this._logger.info("Disabling account for user " + usernameId);

    await cognito
      .adminDisableUser({ Username: usernameId, UserPoolId: userPoolId })
      .promise()
      .then(() => {
        this._logger.success(`The account of ${usernameId} has been disabled!`);
      });
  }

  /**
   * Get all user of user pools
   * @param region string
   * @param userPoolId string
   * @returns UserDomain[]
   */
  async getAllUser({
    region,
    userPoolId,
  }: ICognitoBaseParams): Promise<UserDomain[]> {
    const cognito = await AWSCognitoAdapter.serviceProvider({ region });

    this._logger.info("Fetching users");
    const result = await (
      await cognito
        .listUsers({ UserPoolId: userPoolId })
        .promise()
        .then((res) => {
          this._logger.success("User fetched successfully");
          return res;
        })
    ).Users;
    const parsedUsers = CognitoUserMapper.toDomainEntities(result);
    console.table(parsedUsers);
    return parsedUsers;
  }
}
