import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { google } from "googleapis";
import { mapperAnimalFolder } from "../../../modules/sync/mappers/drive.mapper";
import { getGoogleAuth } from "./client";
import {
  DriveAnimal,
  DriveAnimalFolder,
  DriveImage,
} from "./types";

export async function listFolder(folderId: string) {
  const drive = google.drive({
    version: "v3",
    auth: getGoogleAuth(),
  });

  const { data } = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields:
      "files(id,name,mimeType,modifiedTime,md5Checksum)",
    pageSize: 1000,
  });

  return data.files ?? [];
}

export async function listCategories() {
  const folders = await listFolder(
    process.env.GOOGLE_DRIVE_FOLDER_ID!,
  );

  logger.info(
    "Categorias listadas do Google Drive",
    {
      module: LogModules.GoogleDrive,
      categories: folders.length,
    },
  );

  return folders.filter(
    (folder) =>
      folder.mimeType ===
      "application/vnd.google-apps.folder",
  );
}

export async function listAnimalFolders(
  categoryId: string,
) {
  const folders = await listFolder(categoryId);

  return folders.filter(
    (folder) =>
      folder.mimeType ===
      "application/vnd.google-apps.folder",
  );
}

export async function listImages(
  animalFolderId: string,
): Promise<DriveImage[]> {
  const files =
    await listFolder(animalFolderId);

  return files
    .filter(
      (file) =>
        file.mimeType?.startsWith("image/") &&
        file.id &&
        file.name &&
        file.mimeType,
    )
    .map((file) => ({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
      md5Checksum:
        file.md5Checksum ?? undefined,
      modifiedTime:
        file.modifiedTime ?? undefined,
    }))
    .sort((a, b) => {
      const getOrder = (
        name: string,
      ) => {
        const match =
          name.match(
            /\((\d+)\)(?=\.[^.]+$)/,
          );

        return match
          ? Number(match[1])
          : Number.MAX_SAFE_INTEGER;
      };

      return (
        getOrder(a.name) -
        getOrder(b.name)
      );
    });
}

export async function listAnimalFoldersFromDrive(): Promise<
  DriveAnimalFolder[]
> {
  const categories =
    await listCategories();

  const animals: DriveAnimalFolder[] = [];

  for (const category of categories) {
    const status =
      category.name === "Adotados"
        ? "ADOTADO"
        : "DISPONIVEL";

    const folders =
      await listAnimalFolders(
        category.id!,
      );

    for (const folder of folders) {
      const parsed =
        mapperAnimalFolder(
          folder.name!,
          status,
        );

      if (!parsed) {
        continue;
      }

      animals.push({
        folderId: folder.id!,
        animalId:
          parsed.animalId,
        animalName:
          parsed.animalName,
        status,
      });
    }
  }

  logger.info(
    "Pastas de animais listadas do Google Drive",
    {
      module: LogModules.GoogleDrive,
      animalCount:
        animals.length,
    },
  );

  return animals;
}

export async function listAnimalsBatchFromDrive(
  start: number,
  limit: number,
): Promise<{
  animals: DriveAnimal[];
  totalAnimals: number;
}> {
  const folders =
    await listAnimalFoldersFromDrive();

  const batchFolders =
    folders.slice(
      start,
      start + limit,
    );

  const animals: DriveAnimal[] = [];

  for (const folder of batchFolders) {
    const images =
      await listImages(
        folder.folderId,
      );

    animals.push({
      ...folder,
      images,
    });
  }

  logger.info(
    "Lote carregado do Google Drive",
    {
      module:
        LogModules.GoogleDrive,
      start,
      limit,
      batchSize:
        animals.length,
      totalAnimals:
        folders.length,
    },
  );

  return {
    animals,
    totalAnimals:
      folders.length,
  };
}

export async function listAnimalsFromDrive(): Promise<
  DriveAnimal[]
> {
  const folders =
    await listAnimalFoldersFromDrive();

  const animals: DriveAnimal[] = [];

  for (const folder of folders) {
    const images =
      await listImages(
        folder.folderId,
      );

    animals.push({
      ...folder,
      images,
    });
  }

  logger.info(
    "Animais listados do Google Drive",
    {
      module: LogModules.GoogleDrive,
      animalCount:
        animals.length,
    },
  );

  return animals;
}

export async function downloadImage(
  fileId: string,
): Promise<Buffer> {
  const drive = google.drive({
    version: "v3",
    auth: getGoogleAuth(),
  });

  const response =
    await drive.files.get(
      {
        fileId,
        alt: "media",
      },
      {
        responseType:
          "arraybuffer",
      },
    );

  const buffer = Buffer.from(
    response.data as ArrayBuffer,
  );

  if (buffer.length === 0) {
    throw new Error(
      `Arquivo ${fileId} retornou vazio do Google Drive.`,
    );
  }

  return buffer;
}