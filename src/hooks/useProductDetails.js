import { useEffect, useMemo, useState } from "react";

export const useProductDetails = (product) => {
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "");

  useEffect(() => {
    setMainImage(product?.images?.[0] || "");
  }, [product]);

  const averageRating = useMemo(() => {
    if (!product?.rating?.length) {
      return 0;
    }

    const total = product.rating.reduce((acc, item) => acc + item.rating, 0);
    return total / product.rating.length;
  }, [product]);

  return {
    mainImage,
    setMainImage,
    averageRating,
  };
};
