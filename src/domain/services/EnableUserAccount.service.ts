import { inject, injectable } from "inversify";
import { CognitoPoolRepositoryImpl } from "../../infrastructure/repository/CognitoPoolRepositoryImpl";

@injectable()
export class EnableUserAccount {
  constructor(
    @inject(CognitoPoolRepositoryImpl)
    private readonly _cognitoRepository: CognitoPoolRepositoryImpl
  ) {}

  async execute(region: string, userPoolId: string, usernameId: string) {
    return await this._cognitoRepository.enableAccount({
      region,
      usernameId,
      userPoolId,
    });
  }
}
