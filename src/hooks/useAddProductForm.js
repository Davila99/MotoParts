import { useState } from "react";

export const useAddProductForm = () => {
  const [infoProducto, setInfoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio_original: "",
    precio_oferta: "",
    categoria: "",
  });
  const [imagen, setImagen] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoriaChange = (value) => {
    setInfoProducto((prev) => ({ ...prev, categoria: value }));
  };

  const resetForm = () => {
    setInfoProducto({
      nombre: "",
      descripcion: "",
      precio_original: "",
      precio_oferta: "",
      categoria: "",
    });
    setImagen(null);
  };

  return {
    infoProducto,
    imagen,
    nuevaCategoria,
    setNuevaCategoria,
    setImagen,
    handleChange,
    handleCategoriaChange,
    resetForm,
  };
};
