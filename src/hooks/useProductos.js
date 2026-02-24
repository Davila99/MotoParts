import { useCallback, useEffect, useState } from "react";
import { productosApi } from "../api/productosApi";
import { storageService } from "../services/storageService";
import { isNonEmptyString, toNumberOrZero } from "../utils/validators";
import { mapProductoFromApi, mapProductoToApi } from "../utils/productMapper";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await productosApi.select({
      order: { column: "fecha", ascending: false },
    });

    if (apiError) {
      setError(apiError);
      setProductos([]);
    } else {
      setProductos((data || []).map(mapProductoFromApi));
    }

    setLoading(false);
  }, []);

  const addProducto = useCallback(
    async ({
      nombre,
      descripcion,
      precioOriginal,
      precioOferta,
      categoria,
      imagen,
    }) => {
      if (!isNonEmptyString(nombre)) {
        return { data: null, error: new Error("Nombre invalido") };
      }

      if (!isNonEmptyString(descripcion)) {
        return { data: null, error: new Error("Descripcion invalida") };
      }

      if (!isNonEmptyString(categoria)) {
        return { data: null, error: new Error("Categoria invalida") };
      }

      setLoading(true);
      setError(null);

      let imagenUrl = null;
      if (imagen) {
        const { data: uploadData, error: uploadError } =
          await storageService.uploadProductImage(imagen);

        if (uploadError) {
          setLoading(false);
          setError(uploadError);
          return { data: null, error: uploadError };
        }

        imagenUrl = uploadData.publicUrl;
      }

      const payload = mapProductoToApi({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precioOriginal: toNumberOrZero(precioOriginal),
        precioOferta: toNumberOrZero(precioOferta),
        categoria: categoria.trim(),
        imagenUrl,
        disponible: true,
      });

      const { data, error: apiError } = await productosApi.insert(payload);

      if (apiError) {
        setError(apiError);
      } else {
        setProductos((prev) => [mapProductoFromApi(data), ...prev]);
      }

      setLoading(false);
      return { data, error: apiError };
    },
    []
  );

  const updateProducto = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await productosApi.update(id, updates);

    if (apiError) {
      setError(apiError);
    } else {
      setProductos((prev) =>
        prev.map((producto) =>
          producto.id === id ? mapProductoFromApi(data) : producto
        )
      );
    }

    setLoading(false);
    return { data, error: apiError };
  }, []);

  const deleteProducto = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    const { error: apiError } = await productosApi.delete(id);

    if (apiError) {
      setError(apiError);
    } else {
      setProductos((prev) => prev.filter((producto) => producto.id !== id));
    }

    setLoading(false);
    return { error: apiError };
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return {
    productos,
    loading,
    error,
    fetchProductos,
    addProducto,
    updateProducto,
    deleteProducto,
  };
};
