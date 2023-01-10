import { inject, injectable } from "inversify";
import { UseCase } from "../../core/common/usecase/UseCase.interface";
import { DITokens } from "../../core/di-container/di-tokens";
import { CognitoPoolRepository } from "../../infrastructure/repository/CognitoPoolRepository";
import { UserDomain } from "../entities/user";
import { ICognitoBaseParams } from "../interface/ICognitoBaseParams.interface";

@injectable()
export class GetAllUsersUseCase implements UseCase<ICognitoBaseParams, UserDomain[]> {
  constructor(
    @inject(DITokens.CognitoPoolRepository)
    private readonly _cognitoRepository: CognitoPoolRepository
  ) {}

  async execute({ region, userPoolId }: ICognitoBaseParams) {
    return await this._cognitoRepository.getAllUser({ region, userPoolId });
  }
}
