import { supabase } from "../services/supabase";

const TABLE_NAME = "productos";

const mapOrderOptions = (options) => {
  if (!options || !options.column) {
    return null;
  }

  return {
    column: options.column,
    ascending: options.ascending !== false,
  };
};

export const productosApi = {
  select: async (options = {}) => {
    const orderOptions = mapOrderOptions(options.order);
    let query = supabase.from(TABLE_NAME).select("*");

    if (orderOptions) {
      query = query.order(orderOptions.column, {
        ascending: orderOptions.ascending,
      });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    return query;
  },
  insert: async (producto) => {
    return supabase.from(TABLE_NAME).insert([producto]).select().single();
  },
  update: async (id, updates) => {
    return supabase.from(TABLE_NAME).update(updates).eq("id", id).select().single();
  },
  delete: async (id) => {
    return supabase.from(TABLE_NAME).delete().eq("id", id);
  },
};
