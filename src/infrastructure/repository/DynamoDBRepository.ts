import { DynamoDB } from "aws-sdk";
import { injectable } from "inversify";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY_ID,
} from "../../core/env/environment";
import { IDynamoDBRepository } from "../interface/IDynamoDBRepository.interface";

@injectable()
export abstract class DynamoDBRepository implements IDynamoDBRepository {
  protected readonly _db: DynamoDB.DocumentClient;
  constructor() {
    this._db = new DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      region: "us-east-2",
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
      },
    });
  }
}
