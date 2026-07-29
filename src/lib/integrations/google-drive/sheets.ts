import { google } from "googleapis";
import { getGoogleAuth } from "./client";

export function getSheets() {
  return google.sheets({
    version: "v4",
    auth: getGoogleAuth(),
  });
}