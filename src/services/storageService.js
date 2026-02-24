import { supabase } from "./supabase";

const BUCKET_NAME = "productos";

export const storageService = {
  uploadProductImage: async (file) => {
    if (!file) {
      return { data: null, error: null };
    }

    const fileName = `${Date.now()}-${file.name}`;
    const uploadResult = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);

    if (uploadResult.error) {
      return { data: null, error: uploadResult.error };
    }

    const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

    return { data: { publicUrl: urlData.publicUrl }, error: null };
  },
};
