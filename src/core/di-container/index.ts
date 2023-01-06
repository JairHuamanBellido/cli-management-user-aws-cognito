import { Container } from "inversify";
import { CognitoPoolRepositoryImpl } from "../../infrastructure/repository/CognitoPoolRepositoryImpl";

const DIContainer = new Container();

DIContainer.bind<CognitoPoolRepositoryImpl>(CognitoPoolRepositoryImpl).toSelf();

export { DIContainer };
