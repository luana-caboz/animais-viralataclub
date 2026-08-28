type ImageUploadResult = {
  secureUrl: string;
};

export type ImageUploader = (
  buffer: Buffer,
  animalId: string,
  filename: string,
) => Promise<ImageUploadResult>;

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export class InvalidAnimalImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidAnimalImageError";
  }
}

export class AnimalImageUploadService {
  private readonly uploader: ImageUploader;

  constructor(uploader: ImageUploader) {
    this.uploader = uploader;
  }

  async upload(file: File) {
    const extension = ALLOWED_IMAGE_TYPES.get(file.type);

    if (!extension || file.size === 0 || file.size > MAX_IMAGE_SIZE) {
      throw new InvalidAnimalImageError(
        "A imagem deve ser PNG, JPG ou WEBP e ter no máximo 5 MB.",
      );
    }

    const result = await this.uploader(
      Buffer.from(await file.arrayBuffer()),
      "manual",
      `${crypto.randomUUID()}.${extension}`,
    );

    return result.secureUrl;
  }
}
