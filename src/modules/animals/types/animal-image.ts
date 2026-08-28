export type AnimalImage = {
  id: string;
  animalId: string;
  url: string;
  cloudinaryPublicId?: string;
  driveFileId?: string;
  driveMd5?: string;
  driveModifiedTime?: string;
  legenda?: string;
  ordem: number;
  principal: boolean;
};

export type AnimalImageDB = {
  id: string;
  animal_id: string;

  url: string;
  cloudinary_public_id?: string | null;

  drive_file_id?: string | null;
  drive_md5?: string | null;
  drive_modified_time?: string | null;

  legenda: string | null;

  ordem: number;
  principal: boolean;

  created_at: string;
};

export type AnimalImageInsert = {
  animal_id: string;

  url: string;
  cloudinary_public_id?: string;

  drive_file_id?: string;
  drive_md5?: string;
  drive_modified_time?: string;

  legenda?: string | null;

  ordem: number;
  principal: boolean;
};
