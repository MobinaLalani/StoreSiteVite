"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Link from "@/src/components/ui/AppLink";
import { Product } from "../../../../types/product";

import ProductImage from "./ProductImage";
import ProductRating from "./ProductRating";
import ProductActions from "./ProductActions";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const productPath = `/products/${product.slug.replace(/^\//, "")}`;

  const openProduct = () => navigate(productPath);

  return (
<motion.article
  layout
  whileHover={{ y: -8 }}
  transition={{ duration: 0.25 }}
  onClick={(event) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    openProduct();
  }}
  onKeyDown={(event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target === event.currentTarget) {
      event.preventDefault();
      openProduct();
    }
  }}
  role="link"
  tabIndex={0}
  aria-label={`مشاهده جزئیات ${product.title}`}
  className="group flex min-h-[440px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-[0_18px_50px_-34px_rgba(15,23,42,.55)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-red-100 hover:shadow-[0_28px_70px_-35px_rgba(239,68,68,.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:h-[520px] sm:rounded-3xl"
>
  <ProductImage product={product} />

  <div className="flex flex-1 flex-col space-y-4 p-4 sm:space-y-5 sm:p-8">
    <div className="flex-1">
      <Link href={productPath}>
        <h3 className="line-clamp-1 text-lg font-bold transition-colors hover:text-red-500">
          {product.title}
        </h3>
      </Link>

      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
        {product.description}
      </p>
    </div>

    <ProductRating product={product} />

    <ProductActions productId={product.id} productTitle={product.title} />
  </div>
</motion.article>
  );
}
