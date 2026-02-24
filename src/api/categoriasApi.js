import { supabase } from "../services/supabase";

const TABLE_NAME = "categorias";

export const categoriasApi = {
  select: async () => {
    return supabase.from(TABLE_NAME).select("*").order("nombre", {
      ascending: true,
    });
  },
  insert: async (categoria) => {
    return supabase.from(TABLE_NAME).insert([categoria]).select().single();
  },
  update: async (id, updates) => {
    return supabase.from(TABLE_NAME).update(updates).eq("id", id).select().single();
  },
  delete: async (id) => {
    return supabase.from(TABLE_NAME).delete().eq("id", id);
  },
};
