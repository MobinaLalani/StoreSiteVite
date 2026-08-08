import ProductSectionHeader from "./ProductSectionHeader";
import ProductGrid from "./ProductGrid";
import ProductEmpty from "./ProductEmpty";

import Container from "../../../../components/ui/Container";

import ProductGridSkeleton from "../skeletons/ProductGridSkeleton";

import { useProducts } from "@/src/features/admin/products/hooks/useProducts";

interface ProductSectionProps {
  title: string;
  description?: string;
}

export default function ProductSection({
  
  title,
  description,
}: ProductSectionProps) {
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return <ProductEmpty title={isError ? "خطا در دریافت محصولات" : undefined} description={isError ? "ارتباط با API محصولات برقرار نشد. لطفاً دوباره تلاش کنید." : undefined} />;

  }

  return (
    <>
      <Container>
        <section className="m-10 mt-0 py-20">
          <ProductSectionHeader title={title} description={description} />

          <ProductGrid products={products} />
        </section>
      </Container>
    </>
  );
}
