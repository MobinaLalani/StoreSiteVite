"use client";

import Image from "@/src/components/ui/AppImage";
import Link from "@/src/components/ui/AppLink";
import { motion } from "framer-motion";

import { Category } from "@/src/types/category";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/products/category/${category.slug.replace(/^\//, "")}`}
      className="block h-full"
      aria-label={`مشاهده محصولات دسته ${category.title}`}
    >
      <motion.article
        whileHover={{
          y: -8,
          scale: 1.04,
        }}
        whileTap={{
          scale: 0.97,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          group
          flex
          h-full
          min-h-36
          flex-col
          rounded-2xl
          border
          border-white/80
          bg-white/85
          p-3
          sm:rounded-3xl
          sm:min-h-48
          sm:p-6
          shadow-[0_16px_45px_-30px_rgba(15,23,42,.5)]
          backdrop-blur
          transition-all
          hover:border-red-200
          hover:shadow-[0_25px_60px_-30px_rgba(239,68,68,.45)]
        "
      >
        <div className="flex h-full flex-col items-center">
          <div
            className="
              relative
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-gray-100
              transition-all
              group-hover:bg-red-50
              sm:h-24
              sm:w-24
            "
          >
            <Image
              src={category.image}
              alt={category.title}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          <div className="mt-3 flex min-h-10 items-center justify-center text-center sm:mt-5 sm:min-h-14">
          <h3
            className="
              line-clamp-2
              text-sm
              font-bold
              text-gray-800
              transition-colors
              group-hover:text-red-500
              sm:text-lg
            "
          >
            {category.title}
          </h3>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
