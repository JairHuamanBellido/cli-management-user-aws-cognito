import { inject, injectable } from "inversify";
import { Logger } from "../../core/common/logger/Logger";
import { UserDomain } from "../../domain/entities/user";
import { ICognitoBaseParams } from "../../domain/interface/ICognitoBaseParams.interface";
import { IManagementAccount } from "../../domain/interface/IManagementAccount.interface";
import { CognitoPoolRepository } from "../abstract/CognitoPoolRepository";
import { AWSCognitoAdapter } from "../adapter/AWSCognito.adapter";
import { CognitoUserMapper } from "../mapper/AWSCognitoUser.mapper";

@injectable()
export class CognitoPoolRepositoryImpl implements CognitoPoolRepository {
  constructor(@inject(Logger) private readonly _logger: Logger) {}

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

    this._logger.loading("Enabling account for user " + usernameId);
    await cognito
      .adminEnableUser({ Username: usernameId, UserPoolId: userPoolId })
      .promise()
      .then(() => {
        this._logger.success(
          ` [SUCCESS] The account of ${usernameId} has been enabled!`
        );
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

    this._logger.loading("Disabling account for user " + usernameId);

    await cognito
      .adminDisableUser({ Username: usernameId, UserPoolId: userPoolId })
      .promise()
      .then(() => {
        this._logger.success(
          ` [SUCCESS] The account of ${usernameId} has been disabled!`
        );
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

    this._logger.loading("Fetching users");
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
