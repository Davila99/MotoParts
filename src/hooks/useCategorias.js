import { useCallback, useEffect, useState } from "react";
import { categoriasApi } from "../api/categoriasApi";
import { isNonEmptyString } from "../utils/validators";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await categoriasApi.select();

    if (apiError) {
      setError(apiError);
      setCategorias([]);
    } else {
      setCategorias(data || []);
    }

    setLoading(false);
  }, []);

  const addCategoria = useCallback(
    async (nombre) => {
      if (!isNonEmptyString(nombre)) {
        return { data: null, error: new Error("Categoria invalida") };
      }

      setLoading(true);
      setError(null);

      const { data, error: apiError } = await categoriasApi.insert({
        nombre: nombre.trim(),
      });

      if (apiError) {
        setError(apiError);
      } else {
        setCategorias((prev) => [...prev, data]);
      }

      setLoading(false);
      return { data, error: apiError };
    },
    []
  );

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  return {
    categorias,
    loading,
    error,
    fetchCategorias,
    addCategoria,
  };
};
