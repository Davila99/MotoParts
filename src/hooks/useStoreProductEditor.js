import { useState } from "react";

export const useStoreProductEditor = () => {
  const [editandoId, setEditandoId] = useState(null);
  const [formularioEdicion, setFormularioEdicion] = useState({
    nombre: "",
    descripcion: "",
    precio_original: 0,
    precio_oferta: 0,
    imagen_url: "",
  });

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setFormularioEdicion({
      nombre: producto.raw?.nombre || producto.name || "",
      descripcion: producto.raw?.descripcion || producto.description || "",
      precio_original: producto.raw?.precio_original || producto.originalPrice || 0,
      precio_oferta: producto.raw?.precio_oferta || producto.price || 0,
      imagen_url: producto.raw?.imagen_url || producto.images?.[0] || "",
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormularioEdicion({
      nombre: "",
      descripcion: "",
      precio_original: 0,
      precio_oferta: 0,
      imagen_url: "",
    });
  };

  const manejarCambioFormulario = (event) => {
    const { name, value } = event.target;
    setFormularioEdicion((prev) => ({
      ...prev,
      [name]: name.includes("precio") ? parseFloat(value) || 0 : value,
    }));
  };

  return {
    editandoId,
    formularioEdicion,
    iniciarEdicion,
    cancelarEdicion,
    manejarCambioFormulario,
    setEditandoId,
    setFormularioEdicion,
  };
};
