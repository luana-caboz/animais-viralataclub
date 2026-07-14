export type AnimalImage = {
  id: string;
  animalId: string;
  url: string;
  legenda?: string;
  ordem: number;
  principal: boolean;
};

export type AnimalImageDB = {
  id: string;
  animal_id: string;

  url: string;
  legenda: string | null;

  ordem: number;
  principal: boolean;

  created_at: string;
};