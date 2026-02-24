import { toast } from "react-hot-toast";
import Loading from "../Components/Common/Loading";
import StoreManageProductsView from "../Components/Store/StoreManageProductsView";
import { useProductos } from "../hooks/useProductos";
import { useStoreProductEditor } from "../hooks/useStoreProductEditor";

const StoreManageProducts = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "C$";
  const { productos, loading, fetchProductos, updateProducto, deleteProducto } = useProductos();
  const {
    editandoId,
    formularioEdicion,
    iniciarEdicion,
    cancelarEdicion,
    manejarCambioFormulario,
  } = useStoreProductEditor();

  const handleAlternarStock = async (productoId) => {
    const producto = productos.find((item) => item.id === productoId);
    if (!producto) {
      return;
    }

    const { error } = await updateProducto(productoId, {
      disponible: !producto.disponible,
    });

    if (error) {
      toast.error("Error al actualizar disponibilidad");
    } else {
      toast.success("Disponibilidad actualizada");
    }
  };

  const handleGuardarEdicion = async () => {
    if (!editandoId) {
      return;
    }

    if (!formularioEdicion.nombre.trim()) {
      toast.error("El nombre es requerido");
      return;
    }

    if (formularioEdicion.precio_oferta <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }

    const { error } = await updateProducto(editandoId, {
      nombre: formularioEdicion.nombre,
      descripcion: formularioEdicion.descripcion,
      precio_original: formularioEdicion.precio_original,
      precio_oferta: formularioEdicion.precio_oferta,
      imagen_url: formularioEdicion.imagen_url,
      fecha: new Date().toISOString(),
    });

    if (error) {
      toast.error("Error al actualizar producto");
      return;
    }

    toast.success("Producto actualizado exitosamente");
    cancelarEdicion();
  };

  const handleEliminarProducto = async (productoId) => {
    if (!window.confirm("Estas seguro de eliminar este producto?")) {
      return;
    }

    const { error } = await deleteProducto(productoId);
    if (error) {
      toast.error("Error al eliminar producto");
      return;
    }

    toast.success("Producto eliminado exitosamente");
  };

  if (loading) return <Loading />;

  return (
    <StoreManageProductsView
      productos={productos}
      editandoId={editandoId}
      formularioEdicion={formularioEdicion}
      onChangeFormulario={manejarCambioFormulario}
      onGuardarEdicion={handleGuardarEdicion}
      onCancelarEdicion={cancelarEdicion}
      onIniciarEdicion={iniciarEdicion}
      onEliminarProducto={handleEliminarProducto}
      onAlternarStock={handleAlternarStock}
      onRefresh={fetchProductos}
      loading={loading}
      currency={currency}
    />
  );
};

export default StoreManageProducts;