import {
  UsersListType,
  UserType,
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import { UserDomain } from "../../domain/entities/user";
import cognitoUserAttributeValue from "../../utils/cognito-user-attribute-value.utils";

export class CognitoUserMapper {
  public static toDomainEntity(awsCognitoUser: UserType): UserDomain {
    const { Attributes, Username, Enabled } = awsCognitoUser;
    return {
      usernameId: Username as string,
      name: cognitoUserAttributeValue(Attributes, "name"),
      lastname: cognitoUserAttributeValue(Attributes, "family_name"),
      email: cognitoUserAttributeValue(Attributes, "email"),
      account_status: (Enabled as boolean) ? "Enabled" : "Disabled",
    };
  }

  public static toDomainEntities(
    awsCognitoUsers: UsersListType | undefined
  ): UserDomain[] {
    return !!awsCognitoUsers
      ? awsCognitoUsers.map((e) => this.toDomainEntity(e))
      : [];
  }
}
