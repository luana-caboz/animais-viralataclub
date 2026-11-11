import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { google } from "googleapis";
import { mapperAnimalFolder } from "../../../modules/sync/mappers/drive.mapper";
import { mapWithConcurrency } from "@/shared/utils/concurrency";
import { getGoogleAuth } from "./client";
import {
  DriveAnimal,
  DriveAnimalFolder,
  DriveImage,
} from "./types";

// Chamadas simultâneas ao Drive (fica bem abaixo da cota da API)
const DRIVE_CONCURRENCY = 5;

let driveClient: ReturnType<typeof google.drive> | null = null;

function getDrive() {
  driveClient ??= google.drive({
    version: "v3",
    auth: getGoogleAuth(),
  });

  return driveClient;
}

export async function listFolder(folderId: string) {
  const drive = getDrive();

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

  // Categorias listadas em paralelo, mantendo a ordem original
  const foldersByCategory = await Promise.all(
    categories.map((category) =>
      listAnimalFolders(category.id!),
    ),
  );

  for (const [index, category] of categories.entries()) {
    const status =
      category.name === "Adotados"
        ? "ADOTADO"
        : "DISPONIVEL";

    const folders = foldersByCategory[index];

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

  const animals: DriveAnimal[] = await mapWithConcurrency(
    batchFolders,
    DRIVE_CONCURRENCY,
    async (folder) => ({
      ...folder,
      images: await listImages(folder.folderId),
    }),
  );

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

  const animals: DriveAnimal[] = await mapWithConcurrency(
    folders,
    DRIVE_CONCURRENCY,
    async (folder) => ({
      ...folder,
      images: await listImages(folder.folderId),
    }),
  );

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
  const drive = getDrive();

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