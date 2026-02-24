import { supabase } from "../services/supabase";

const TABLE_NAME = "pedidos";

export const pedidosApi = {
  select: async (options = {}) => {
    let query = supabase.from(TABLE_NAME).select("*");

    if (options.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending !== false,
      });
    }

    return query;
  },
  insert: async (pedido) => {
    return supabase.from(TABLE_NAME).insert([pedido]).select().single();
  },
  update: async (id, updates) => {
    return supabase.from(TABLE_NAME).update(updates).eq("id", id).select().single();
  },
  delete: async (id) => {
    return supabase.from(TABLE_NAME).delete().eq("id", id);
  },
};
