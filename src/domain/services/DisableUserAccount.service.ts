import { inject, injectable } from "inversify";
import { CognitoPoolRepositoryImpl } from "../../infrastructure/repository/CognitoPoolRepositoryImpl";

@injectable()
export class DisableUserAccount {
  constructor(
    @inject(CognitoPoolRepositoryImpl)
    private readonly _cognitoRepository: CognitoPoolRepositoryImpl
  ) {}

  async execute(region: string, userPoolId: string, usernameId: string) {
    return await this._cognitoRepository.disableAccount({
      region,
      usernameId,
      userPoolId,
    });
  }
}
