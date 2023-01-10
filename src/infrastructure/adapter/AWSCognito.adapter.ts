import { CognitoIdentityServiceProvider } from "aws-sdk";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY_ID,
} from "../../core/env/environment";
import { AWSCognitoAdapterServiceProviderParams } from "../interface/IAWSCognitoAdapter.interface";

export class AWSCognitoAdapter {
  public static serviceProvider({
    region,
  }: AWSCognitoAdapterServiceProviderParams) {
    return new CognitoIdentityServiceProvider({
      apiVersion: "2016-04-18",
      region: region,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID as string,
        secretAccessKey: AWS_SECRET_ACCESS_KEY_ID as string,
      },
    });
  }
}
