import { inject, injectable } from "inversify";
import { CognitoPoolRepositoryImpl } from "../../infrastructure/repository/CognitoPoolRepositoryImpl";
import { WebsocketRepositoryImpl } from "../../infrastructure/repository/WebsocketRepositoryImpl";

@injectable()
export class DisableUserAccount {
  constructor(
    @inject(CognitoPoolRepositoryImpl)
    private readonly _cognitoRepository: CognitoPoolRepositoryImpl,
    @inject(WebsocketRepositoryImpl)
    private readonly _websocket: WebsocketRepositoryImpl
  ) {}

  async execute(region: string, userPoolId: string, usernameId: string) {
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
