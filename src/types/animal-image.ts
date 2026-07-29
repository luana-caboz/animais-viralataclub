export type AnimalImage = {
  id: string;
  animalId: string;
  url: string;
  cloudinaryPublicId: string;
  legenda?: string;
  ordem: number;
  principal: boolean;
};

export type AnimalImageDB = {
  id: string;
  animal_id: string;

  url: string;
  cloudinary_public_id: string;
  legenda: string | null;

  ordem: number;
  principal: boolean;

  created_at: string;
};

export type AnimalImageInsert = {
  animal_id: string;

  url: string;
  cloudinary_public_id: string;

  legenda?: string | null;

  ordem: number;
  principal: boolean;
};