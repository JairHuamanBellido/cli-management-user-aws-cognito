import { UserDomain } from "../../domain/entities/user";
import { ICognitoBaseParams } from "../../domain/interface/ICognitoBaseParams.interface";
import { IManagementAccount } from "../../domain/interface/IManagementAccount.interface";

export abstract class CognitoPoolRepository {
  abstract enableAccount(params: IManagementAccount): Promise<void>;
  abstract disableAccount(params: IManagementAccount): Promise<void>;
  abstract getAllUser(params: ICognitoBaseParams): Promise<UserDomain[]>;
}
