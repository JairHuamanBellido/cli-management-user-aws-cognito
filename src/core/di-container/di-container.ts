import { Container } from "inversify";
import { CognitoPoolRepository } from "../../infrastructure/repository/CognitoPoolRepository";
import { WebsocketRepository } from "../../infrastructure/repository/WebsocketRepository";
import { Logger } from "../common/logger/Logger";
import { DITokens } from "./di-tokens";

const DIContainer = new Container();

DIContainer.bind<CognitoPoolRepository>(DITokens.CognitoPoolRepository).to(
  CognitoPoolRepository
);
DIContainer.bind<WebsocketRepository>(DITokens.WebsocketRepository).to(
  WebsocketRepository
);
DIContainer.bind<Logger>(DITokens.Logger).to(Logger);

export { DIContainer };
