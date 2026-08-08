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

      <Link href={`/products/${encodeURIComponent(product.slug.replace(/^\//, ""))}`}>
        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.35,
          }}
          className="relative flex h-56 items-center justify-center bg-gradient-to-b from-slate-50 to-white after:absolute after:inset-x-10 after:bottom-3 after:h-8 after:rounded-full after:bg-slate-900/10 after:blur-xl sm:h-72"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={220}
            height={220}
            className="relative z-10 object-contain drop-shadow-[0_18px_18px_rgba(15,23,42,.18)]"
          />
        </motion.div>
      </Link>
    </div>
  );
}
