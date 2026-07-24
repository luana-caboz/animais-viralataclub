import { google } from "googleapis";
import { getGoogleAuth } from "./client";

export function getDrive() {
  return google.drive({
    version: "v3",
    auth: getGoogleAuth(),
  });
}