import { ApiGatewayManagementApi } from "aws-sdk";
import { inject, injectable } from "inversify";
import { Logger } from "../../core/common/logger/Logger";
import { DITokens } from "../../core/di-container/di-tokens";
import { AWS_WEBSOCKET_URL } from "../../core/env/environment";
import { IWebsocketRepository } from "../interface/IWebsocketRepository";

@injectable()
export class WebsocketRepository implements IWebsocketRepository {
  private readonly _websocket: ApiGatewayManagementApi;

  constructor(@inject(DITokens.Logger) private readonly _logger: Logger) {
    this._websocket = new ApiGatewayManagementApi({
      endpoint: AWS_WEBSOCKET_URL,
    });
  }

  async forceDisconnectUserSession(connectionId: string): Promise<void> {
    this._logger.info("Trying to disconnect user session...");
    await this._websocket
      .postToConnection({
        ConnectionId: connectionId,
        Data: Buffer.from(
          JSON.stringify({
            action: "ACCOUNT BLOCKET",
            message: "You are has been blocked",
          })
        ),
      })
      .promise()
      .then(() => {
        this._logger.success(
          `The connection [${connectionId}] was disconnected successfully!`
        );
      })
      .catch((e) => {
        this._logger.error(e);
      });
  }
}
