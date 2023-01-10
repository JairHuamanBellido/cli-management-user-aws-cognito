import { Container } from "inversify";
import { CognitoPoolRepositoryImpl } from "../../infrastructure/repository/CognitoPoolRepositoryImpl";
import { WebsocketRepositoryImpl } from "../../infrastructure/repository/WebsocketRepositoryImpl";
import { Logger } from "../common/logger/Logger";

const DIContainer = new Container();

DIContainer.bind<CognitoPoolRepositoryImpl>(CognitoPoolRepositoryImpl).toSelf();
DIContainer.bind<WebsocketRepositoryImpl>(WebsocketRepositoryImpl).toSelf();
DIContainer.bind<Logger>(Logger).toSelf();
export { DIContainer };
