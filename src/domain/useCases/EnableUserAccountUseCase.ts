import { inject, injectable } from "inversify";
import { UseCase } from "../../core/common/usecase/UseCase.interface";
import { DITokens } from "../../core/di-container/di-tokens";
import { CognitoPoolRepository } from "../../infrastructure/repository/CognitoPoolRepository";
import { ICognitoBaseParams } from "../interface/ICognitoBaseParams.interface";

interface Params extends ICognitoBaseParams {
  usernameId: string;
}

@injectable()
export class EnableUserAccountUseCase implements UseCase<Params, void> {
  constructor(
    @inject(DITokens.CognitoPoolRepository)
    private readonly _cognitoRepository: CognitoPoolRepository
  ) {}

  async execute({ region, userPoolId, usernameId }: Params) {
    return await this._cognitoRepository.enableAccount({
      region,
      usernameId,
      userPoolId,
    });
  }
}
