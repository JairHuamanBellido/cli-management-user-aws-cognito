import { inject, injectable } from "inversify";
import { Logger } from "../../core/common/logger/Logger";
import { WebsocketRepository } from "../abstract/WebsocketRepository";

@injectable()
export class WebsocketRepositoryImpl extends WebsocketRepository {
  constructor(@inject(Logger) private readonly _logger: Logger) {
    super();
  }
  async forceDisconnectUserSession(connectionId: string): Promise<void> {
    this._logger.loading("Trying to disconnect user session...");
    await this._websocket
      .postToConnection({
        ConnectionId: connectionId,
        Data: Buffer.from("pediste pe batedía"),
      })
      .promise()
      .then(() => {
        this._logger.success(
          `The connection [${connectionId}] was disconnected successfully!`
        );
      });
  }
}
