import { inject, injectable } from "inversify";
import { CognitoPoolRepositoryImpl } from "../../infrastructure/repository/CognitoPoolRepositoryImpl";

@injectable()
export class GetAllUsers {
  constructor(
    @inject(CognitoPoolRepositoryImpl)
    private readonly _cognitoRepository: CognitoPoolRepositoryImpl
  ) {}

  async execute(region: string, userPoolId: string) {
    return await this._cognitoRepository.getAllUser({ region, userPoolId });
  }
}
