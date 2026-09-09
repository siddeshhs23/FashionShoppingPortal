const fallbackImages = {
  men: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  women: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  kids: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=900&q=85",
  default: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=85",
};

export function getProductImage(product) {
  if (product?.image) {
    return product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`;
  }

  const category = product?.category?.toLowerCase() || "";
  return fallbackImages[category] || fallbackImages.default;
}
