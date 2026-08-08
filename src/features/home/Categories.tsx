"use client";

import { motion } from "framer-motion";

import Container from "../../components/ui/Container";

import { useCategoriesWithProducts } from "@/src/features/admin/categories/hooks/useCategoriesWithProducts";

import CategoryCard from "./CategoryCard";

export default function Categories() {
  const { data: categories = [], isLoading, isError } = useCategoriesWithProducts();
  
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <h2 className="text-2xl font-black sm:text-4xl">دسته‌بندی محصولات</h2>

          <p className="mt-3 text-gray-500">محبوب‌ترین دسته‌بندی‌های فروشگاه</p>
        </motion.div>

        <div
          className="
            mt-12
            grid
            grid-cols-2
            gap-3
            gap-6
            md:grid-cols-3
            lg:grid-cols-6
            lg:gap-6
          "
        >
          {isLoading && <p className="col-span-full py-10 text-center text-gray-500">در حال دریافت دسته‌بندی‌ها...</p>}
          {isError && <p className="col-span-full py-10 text-center text-red-500">دریافت دسته‌بندی‌ها ناموفق بود.</p>}
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
