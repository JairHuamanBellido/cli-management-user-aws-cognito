import { ApiGatewayManagementApi } from "aws-sdk";
import { injectable } from "inversify";
import { AWS_WEBOSCKET_URL } from "../env/environment";

@injectable()
export abstract class WebsocketRepository {
  protected readonly _websocket: ApiGatewayManagementApi;

  constructor() {
    this._websocket = new ApiGatewayManagementApi({
      endpoint: AWS_WEBOSCKET_URL,
    });
  }

  abstract forceDisconnectUserSession(connectionId: string): void;
}
