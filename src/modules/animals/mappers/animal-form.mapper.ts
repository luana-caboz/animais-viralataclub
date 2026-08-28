import type { AnimalImageInsert } from "../types/animal-image";
import type { ParsedAnimalForm } from "../types/animal-mutation";

const MAX_IMAGES = 5;

export class InvalidAnimalFormError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidAnimalFormError";
  }
}

function readText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function readRequiredText(formData: FormData, field: string, label: string) {
  const value = readText(formData, field);

  if (!value) {
    throw new InvalidAnimalFormError(`${label} é obrigatório.`);
  }

  return value;
}

function isAllowedImageUrl(value: string) {
  if (value.startsWith("/")) return true;

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function parseImages(formData: FormData, animalId: string) {
  const raw = readText(formData, "images") || "[]";
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new InvalidAnimalFormError("A lista de imagens é inválida.");
  }

  if (!Array.isArray(parsed) || parsed.length > MAX_IMAGES) {
    throw new InvalidAnimalFormError(
      `É permitido enviar no máximo ${MAX_IMAGES} imagens.`,
    );
  }

  const images = parsed.map((value, index): AnimalImageInsert => {
    if (!value || typeof value !== "object") {
      throw new InvalidAnimalFormError("Uma das imagens é inválida.");
    }

    const image = value as Record<string, unknown>;
    const url = typeof image.url === "string" ? image.url.trim() : "";

    if (!url || !isAllowedImageUrl(url)) {
      throw new InvalidAnimalFormError("Uma das URLs de imagem é inválida.");
    }

    return {
      animal_id: animalId,
      url,
      cloudinary_public_id:
        typeof image.cloudinaryPublicId === "string"
          ? image.cloudinaryPublicId
          : undefined,
      drive_file_id:
        typeof image.driveFileId === "string" ? image.driveFileId : undefined,
      drive_md5:
        typeof image.driveMd5 === "string" ? image.driveMd5 : undefined,
      drive_modified_time:
        typeof image.driveModifiedTime === "string"
          ? image.driveModifiedTime
          : undefined,
      legenda:
        typeof image.legenda === "string" && image.legenda.trim()
          ? image.legenda.trim()
          : null,
      ordem: index,
      principal: image.principal === true,
    };
  });

  if (images.length > 0 && !images.some((image) => image.principal)) {
    images[0].principal = true;
  }

  let foundPrincipal = false;

  return images.map((image) => {
    if (!image.principal || foundPrincipal) {
      return { ...image, principal: false };
    }

    foundPrincipal = true;
    return image;
  });
}

export function mapAnimalForm(formData: FormData): ParsedAnimalForm {
  const id = readRequiredText(formData, "id", "ID");
  const nome = readRequiredText(formData, "nome", "Nome");

  if (id.length > 64 || nome.length > 120) {
    throw new InvalidAnimalFormError("ID ou nome excede o tamanho permitido.");
  }

  return {
    animal: {
      id,
      nome,
      status: readRequiredText(formData, "status", "Status"),
      sexo: readText(formData, "sexo"),
      porte: readText(formData, "porte"),
      cores: readText(formData, "cores"),
      raca: readText(formData, "raca"),
      data_nascimento: readText(formData, "dataNascimento") || null,
      castrado: formData.get("castrado") === "on",
      vacinado: formData.get("vacinado") === "on",
      vermifugado: formData.get("vermifugado") === "on",
      condicoes_saude: readText(formData, "condicoesSaude"),
      personalidade: readText(formData, "personalidade"),
      caes: readText(formData, "caes"),
      gatos: readText(formData, "gatos"),
      criancas: readText(formData, "criancas"),
      energia: readText(formData, "energia"),
      data_resgate: readText(formData, "dataResgate") || null,
      historia: readText(formData, "historia"),
    },
    images: parseImages(formData, id),
  };
}
