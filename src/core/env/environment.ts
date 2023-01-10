import { config } from "dotenv";

config();

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY_ID =
  process.env.AWS_SECRET_ACCESS_KEY_ID || "";
export const AWS_WEBSOCKET_URL = process.env.AWS_WEBSOCKET_URL || "";
