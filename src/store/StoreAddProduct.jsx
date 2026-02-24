import { toast } from "react-hot-toast";
import StoreAddProductView from "../Components/Store/StoreAddProductView";
import { useAddProductForm } from "../hooks/useAddProductForm";
import { useCategorias } from "../hooks/useCategorias";
import { useProductos } from "../hooks/useProductos";

const StoreAddProduct = () => {
  const { categorias, addCategoria, fetchCategorias } = useCategorias();
  const { addProducto, loading } = useProductos();
  const {
    infoProducto,
    imagen,
    nuevaCategoria,
    setNuevaCategoria,
    setImagen,
    handleChange,
    handleCategoriaChange,
    resetForm,
  } = useAddProductForm();

  const handleAddCategoria = async (event) => {
    event.preventDefault();

    const { error } = await addCategoria(nuevaCategoria);
    if (error) {
      toast.error("Error al agregar categoria");
      return;
    }

    toast.success("Categoria agregada");
    setNuevaCategoria("");
    fetchCategorias();
  };

  const handleAddProducto = async (event) => {
    event.preventDefault();

    const { error } = await addProducto({
      nombre: infoProducto.nombre,
      descripcion: infoProducto.descripcion,
      precioOriginal: infoProducto.precio_original,
      precioOferta: infoProducto.precio_oferta,
      categoria: infoProducto.categoria,
      imagen,
    });

    if (error) {
      toast.error("Error al agregar producto");
      return;
    }

    toast.success("Producto agregado correctamente");
    resetForm();
  };

  return (
    <StoreAddProductView
      categorias={categorias}
      infoProducto={infoProducto}
      imagen={imagen}
      onImageChange={setImagen}
      onInfoChange={handleChange}
      onCategoriaChange={handleCategoriaChange}
      onSubmitCategoria={handleAddCategoria}
      nuevaCategoria={nuevaCategoria}
      onNuevaCategoriaChange={setNuevaCategoria}
      onSubmitProducto={(event) =>
        toast.promise(handleAddProducto(event), { loading: "Agregando..." })
      }
      loading={loading}
    />
  );
};

export default StoreAddProduct;
