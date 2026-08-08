import CategoryBreadcrumb from "./CategoryBreadcrumb";
import CategorySectionHero from "./CategorySectionHero";
import CategoryInfo from "./CategoryInfo";
import ProductGrid from "../components/ProductSection/ProductGrid";

import { getCategoryData } from "./utils/getCategoryData";
import { useCategoriesWithProducts } from "@/src/features/admin/categories/hooks/useCategoriesWithProducts";
import ProductGridSkeleton from "../components/skeletons/ProductGridSkeleton";

interface ProductCategoryPageProps {
  slug: string;
}

export default function ProductCategoryPage({
  slug,
}: ProductCategoryPageProps) {
  const { data: categories = [], isLoading, isError } = useCategoriesWithProducts();
  const data = getCategoryData(slug, categories);

  if (isLoading) {
    return <main className="container mx-auto px-4 py-10"><ProductGridSkeleton /></main>;
  }

  if (isError) {
    return <main className="p-16 text-center"><h1 className="text-3xl font-bold">خطا در دریافت دسته‌بندی</h1></main>;
  }

  if (!data) {
    return <main className="p-16 text-center"><h1 className="text-3xl font-bold">دسته‌بندی پیدا نشد</h1></main>;
  }

  const { category, products, productCount, brandCount, averageRating } = data;

  return (
    <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-10">
      <CategoryBreadcrumb title={category.title} />

      <CategorySectionHero
        title={category.title}
        description={category.description}
        image={category.image}
        slug={category.slug}
        productCount={productCount}
        brandCount={brandCount}
        averageRating={averageRating}
      />

      <CategoryInfo
        productCount={productCount}
        brandCount={brandCount}
        averageRating={averageRating}
      />

      <section className="mt-10 sm:mt-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">محصولات {category.title}</h2>

            <p className="mt-2 text-gray-500">
              {productCount} محصول در این دسته
            </p>
          </div>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}
