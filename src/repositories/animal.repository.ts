/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";

export async function findAll() {
  return supabase
    .from("animals")
    .select("*")
    .order("nome");
}

export async function findById(id: string) {
  return supabase
    .from("animals")
    .select("*")
    .eq("id", id)
    .single();
}

export async function create(payload: any) {
  return supabase
    .from("animals")
    .insert(payload);
}

export async function update(
  id: string,
  payload: any
) {
  return supabase
    .from("animals")
    .update(payload)
    .eq("id", id);
}

export async function remove(id: string) {
  return supabase
    .from("animals")
    .delete()
    .eq("id", id);
}