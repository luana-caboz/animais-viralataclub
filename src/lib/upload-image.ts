export async function uploadAnimalImage(
  file: File
) {
  const cloudName =
    process.env
      .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const preset =
    process.env
      .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    preset!
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      "Erro ao enviar imagem"
    );
  }

  return data.secure_url as string;
}