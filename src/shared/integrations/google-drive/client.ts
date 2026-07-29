import { google } from "googleapis";

let auth: InstanceType<typeof google.auth.GoogleAuth> | null = null;

export function getGoogleAuth() {
  if (auth) return auth;

  auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    },

    scopes: [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/spreadsheets.readonly",
    ],
  });

  return auth;
}