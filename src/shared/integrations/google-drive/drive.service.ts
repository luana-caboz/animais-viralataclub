import { google } from "googleapis";
import { getGoogleAuth } from "./client";
import { parseAnimalFolder } from "./parser";

export async function listFolder(folderId: string) {
  const drive = google.drive({
    version: "v3",
    auth: getGoogleAuth(),
  });

  const { data } = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: "files(id,name,mimeType)",
    pageSize: 1000,
  });

  return data.files ?? [];
}

export async function listCategories() {
  const folders = await listFolder(
    process.env.GOOGLE_DRIVE_FOLDER_ID!
  );

  return folders.filter(
    (folder) =>
      folder.mimeType ===
      "application/vnd.google-apps.folder"
  );
}

export async function listImages(
  animalFolderId: string
) {
  const files =
    await listFolder(animalFolderId);

  return files.filter((file) =>
    file.mimeType?.startsWith("image/")
  );
}

export async function listAnimalsFromDrive() {
    const categories =
        await listCategories();

    const animals = [];

    for (const category of categories) {

        const status =
            category.name === "Adotados"
                ? "ADOTADO"
                : "DISPONIVEL";

        const folders =
            await listAnimalFolders(category.id!);

        for (const folder of folders) {

            const parsed =
                parseAnimalFolder(folder.name!);

            if (!parsed) continue;

            const images =
                await listImages(folder.id!);

            animals.push({
                folderId: folder.id!,
                animalId: parsed.animalId,
                animalName: parsed.animalName,
                status,
                images,
            });
        }
    }

    return animals;
}

export async function listAnimalFolders(categoryId: string) {
  const folders = await listFolder(categoryId);

  return folders.filter(
    (folder) =>
      folder.mimeType ===
      "application/vnd.google-apps.folder"
  );
}

