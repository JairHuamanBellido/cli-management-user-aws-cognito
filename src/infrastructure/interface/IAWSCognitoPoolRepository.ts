import { UserDomain } from "../../domain/entities/user";
import { ICognitoBaseParams } from "../../domain/interface/ICognitoBaseParams.interface";
import { IManagementAccount } from "../../domain/interface/IManagementAccount.interface";

export interface IAWSCognitoPoolRepository {
  enableAccount(params: IManagementAccount): Promise<void>;
  disableAccount(params: IManagementAccount): Promise<void>;
  getAllUser(params: ICognitoBaseParams): Promise<UserDomain[]>;
}
