export interface IWebsocketRepository {
  forceDisconnectUserSession(connectionId: string): Promise<void>;
}
