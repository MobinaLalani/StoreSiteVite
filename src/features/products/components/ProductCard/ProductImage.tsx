"use client";

import Image from "@/src/components/ui/AppImage";
import Link from "@/src/components/ui/AppLink";
import { motion } from "framer-motion";

import { Product } from "../../../../types/product";

import ProductBadge from "./ProductBadge";

interface Props {
  product: Product;
}

export default function ProductImage({ product }: Props) {
  return (
    <div className="relative overflow-hidden">
      <ProductBadge product={product} />

      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.35,
          }}
          className="flex h-56 items-center justify-center bg-transparent sm:h-72"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={220}
            height={220}
            className="object-contain"
          />
        </motion.div>
      </Link>
    </div>
  );
}
