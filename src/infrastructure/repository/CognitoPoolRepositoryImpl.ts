import { CognitoIdentityServiceProvider } from "aws-sdk";
import { injectable } from "inversify";
import { UserDomain } from "../../domain/entities/user";
import { ICognitoBaseParams } from "../../domain/interface/ICognitoBaseParams.interface";
import { IManagementAccount } from "../../domain/interface/IManagementAccount.interface";
import { CognitoPoolRepository } from "../abstract/CognitoPoolRepository";
import { AWSCognitoAdapter } from "../adapter/AWSCognito.adapter";
import { CognitoUserMapper } from "../mapper/AWSCognitoUser.mapper";

@injectable()
export class CognitoPoolRepositoryImpl implements CognitoPoolRepository {
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

    await cognito
      .adminEnableUser({ Username: usernameId, UserPoolId: userPoolId })
      .promise();
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

    await cognito
      .adminDisableUser({ Username: usernameId, UserPoolId: userPoolId })
      .promise();
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

    const result = await (
      await cognito.listUsers({ UserPoolId: userPoolId }).promise()
    ).Users;

    return CognitoUserMapper.toDomainEntities(result);
  }
}
