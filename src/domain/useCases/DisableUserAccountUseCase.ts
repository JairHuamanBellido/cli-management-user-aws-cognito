import { inject, injectable } from "inversify";
import { UseCase } from "../../core/common/usecase/UseCase.interface";
import { DITokens } from "../../core/di-container/di-tokens";
import { CognitoPoolRepository } from "../../infrastructure/repository/CognitoPoolRepository";
import { WebsocketRepository } from "../../infrastructure/repository/WebsocketRepository";
import { ICognitoBaseParams } from "../interface/ICognitoBaseParams.interface";

interface Params extends ICognitoBaseParams {
  usernameId: string;
}

@injectable()
export class DisableUserAccountUseCase implements UseCase<Params, void> {
  constructor(
    @inject(DITokens.CognitoPoolRepository)
    private readonly _cognitoRepository: CognitoPoolRepository,
    @inject(DITokens.WebsocketRepository)
    private readonly _websocket: WebsocketRepository
  ) {}

  async execute({ region, userPoolId, usernameId }: Params) {
    try {
      await this._cognitoRepository.disableAccount({
        region,
        usernameId,
        userPoolId,
      });

      await this._websocket.forceDisconnectUserSession(usernameId);
    } catch (error) {
      console.error(error);
    }
  }
}
