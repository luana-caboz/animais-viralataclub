import { AnimalDB } from "./animal-db";

export type CreateAnimalDB =
  Omit<
    AnimalDB,
    | "created_at"
    | "updated_at"
    | "adotado_em"
  >;