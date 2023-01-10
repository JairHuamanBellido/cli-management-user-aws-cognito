import { inject, injectable } from "inversify";
import { UseCase } from "../../core/common/usecase/UseCase.interface";
import { DITokens } from "../../core/di-container/di-tokens";
import { CognitoPoolRepository } from "../../infrastructure/repository/CognitoPoolRepository";
import { SessionRepository } from "../../infrastructure/repository/SessionRepository";
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
    private readonly _websocket: WebsocketRepository,
    @inject(DITokens.SessionRepository)
    private readonly _sessionRepository: SessionRepository
  ) {}

  async execute({ region, userPoolId, usernameId }: Params) {
    try {
      await this._cognitoRepository.disableAccount({
        region,
        usernameId,
        userPoolId,
      });

      const { connectionId } = await this._sessionRepository.findByUserId(
        usernameId
      );
        
      await this._websocket.forceDisconnectUserSession(connectionId);
    } catch (error) {
      console.error(error);
    }
  }
}
