import { toNumberOrZero } from "./validators";

export const mapProductoFromApi = (item) => ({
  id: item.id,
  name: item.nombre,
  description: item.descripcion,
  price: toNumberOrZero(item.precio_oferta || item.precio_original),
  originalPrice: item.precio_original ? toNumberOrZero(item.precio_original) : null,
  images: item.imagen_url ? [item.imagen_url] : ["/default-image.png"],
  rating: item.rating || [{ rating: 4 }],
  category: item.categoria,
  createdAt: item.fecha,
  disponible: item.disponible !== false,
  raw: item,
});

export const mapProductoToApi = ({
  nombre,
  descripcion,
  precioOriginal,
  precioOferta,
  categoria,
  imagenUrl,
  disponible,
}) => ({
  nombre,
  descripcion,
  precio_original: precioOriginal,
  precio_oferta: precioOferta,
  categoria,
  imagen_url: imagenUrl,
  disponible,
  fecha: new Date().toISOString(),
});
