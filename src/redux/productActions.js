import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabase';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('fecha', { ascending: false });

      if (error) {
        console.error('Error Supabase:', error);
        throw new Error(error.message);
      }

      // **Mapeo CORREGIDO con createdAt**
      const formattedData = (data || []).map(item => ({
        id: item.id,
        name: item.nombre,
        description: item.descripcion,
        price: parseFloat(item.precio_oferta || item.precio_original),
        images: item.imagen_url ? [item.imagen_url] : ['/default-image.png'],
        rating: [{ rating: 4 }],
        createdAt: item.fecha,  
      }));

      return formattedData;
      
    } catch (error) {
      console.error('Error en fetchProducts:', error);
      return rejectWithValue(error.message || 'Error desconocido');
    }
  }
);

