import type { Category } from "@/src/types/category";
import type { Product } from "@/src/types/product";

type CategoryWithProducts = Category & { products: Product[] };

export function getCategoryData(slug: string, categories: CategoryWithProducts[]) {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return null;
  }

  const categoryProducts = category.products ?? [];

  const brands = [...new Set(categoryProducts.map((item) => item.brand))];

  const averageRating =
    categoryProducts.length > 0
      ? Number(
          (
            categoryProducts.reduce((sum, item) => sum + item.rating, 0) /
            categoryProducts.length
          ).toFixed(1),
        )
      : 0;

  return {
    category,
    products: categoryProducts,
    productCount: categoryProducts.length,
    brandCount: brands.length,
    brands,
    averageRating,
  };
}
