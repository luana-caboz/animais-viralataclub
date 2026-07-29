import { google } from "googleapis";

import { getGoogleAuth } from "./client";
import { DriveImage } from "./types";

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function listImages(): Promise<
  DriveImage[]
> {
  const drive = google.drive({
    version: "v3",
    auth: getGoogleAuth(),
  });

  const { data } =
    await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed = false`,

      pageSize: 1000,

      orderBy: "name",

      fields:
        "files(id,name,mimeType)",
    });

  return (data.files ?? [])
    .filter((file) =>
      IMAGE_TYPES.includes(file.mimeType ?? "")
    )
    .map((file) => ({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
    }));
}