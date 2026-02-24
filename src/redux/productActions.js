import { createAsyncThunk } from "@reduxjs/toolkit";
import { productosApi } from "../api/productosApi";
import { mapProductoFromApi } from "../utils/productMapper";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await productosApi.select({
        order: { column: "fecha", ascending: false },
      });

      if (error) {
        throw new Error(error.message);
      }

      return (data || []).map(mapProductoFromApi);
    } catch (error) {
      return rejectWithValue(error.message || "Error desconocido");
    }
  }
);

