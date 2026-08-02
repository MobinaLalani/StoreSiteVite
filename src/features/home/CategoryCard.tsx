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
    <Link href={`/products/category/${category.slug}`}>
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
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-3
          sm:rounded-3xl
          sm:p-6
          shadow-sm
          transition-all
          hover:border-red-200
          hover:shadow-xl
        "
      >
        <div className="flex flex-col items-center">
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

          <h3
            className="
              mt-3
              text-sm
              font-bold
              text-gray-800
              transition-colors
              group-hover:text-red-500
              sm:mt-5
              sm:text-lg
            "
          >
            {category.title}
          </h3>
        </div>
      </motion.article>
    </Link>
  );
}
