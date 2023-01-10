export class DITokens {
  public static readonly CognitoPoolRepository: unique symbol = Symbol(
    "CognitoPoolRepository"
  );

  public static readonly WebsocketRepository: unique symbol = Symbol(
    "WebsocketRepository"
  );

  public static readonly Logger: unique symbol = Symbol("Logger");

  public static readonly SessionRepository: unique symbol =
    Symbol("SessionRepository");
}
