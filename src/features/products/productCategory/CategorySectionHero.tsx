"use client";

import Link from "@/src/components/ui/AppLink";
import { motion } from "framer-motion";
import Image from "@/src/components/ui/AppImage";
import { ArrowLeft } from "lucide-react";


interface Props {
  title: string;
  description: string;
  image: string ;
  productCount: number;
  brandCount: number;
  averageRating: number;
  slug: string;
}

export default function CategorySectionHero({
  title,
  description,
  image,
  productCount,
  brandCount,
  averageRating,
  slug,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-50 via-white to-red-50 border border-red-100">
      <div className="grid items-center gap-6 p-5 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
            دسته بندی
          </span>

          <h1 className="mt-5 text-3xl font-extrabold text-gray-900 sm:mt-6 sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-xl leading-8 text-gray-600">{description}</p>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
            <div className="rounded-xl border bg-white p-3 text-center shadow-sm sm:rounded-2xl sm:p-5 sm:text-right">
              <p className="text-xl font-bold sm:text-3xl">{productCount}</p>
              <span className="text-sm text-gray-500">محصول</span>
            </div>

            <div className="rounded-xl border bg-white p-3 text-center shadow-sm sm:rounded-2xl sm:p-5 sm:text-right">
              <p className="text-xl font-bold sm:text-3xl">{brandCount}</p>
              <span className="text-sm text-gray-500">برند</span>
            </div>

            <div className="rounded-xl border bg-white p-3 text-center shadow-sm sm:rounded-2xl sm:p-5 sm:text-right">
              <p className="text-base font-bold sm:text-3xl">⭐ {averageRating}</p>
              <span className="text-sm text-gray-500">میانگین امتیاز</span>
            </div>
          </div>

          <Link
            href={`/products?category=${slug}`}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600 sm:mt-10 sm:w-auto sm:px-6 sm:py-4"
          >
            مشاهده همه محصولات
            <ArrowLeft size={18} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[240px] sm:h-[340px] lg:h-[420px]"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
