"use client";

import { motion } from "framer-motion";

import { Product } from "@/src/types/product";

interface ProductSpecificationsProps {
  product: Product;
}

export default function ProductSpecifications({
  product,
}: ProductSpecificationsProps) {
  return (
    <motion.section
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
      transition={{
        duration: 0.4,
      }}
      className="rounded-2xl border border-gray-200 bg-white p-5 sm:rounded-3xl sm:p-8"
    >
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900">مشخصات فنی</h2>

        <div className="mt-3 h-1 w-20 rounded-full bg-red-500" />
      </div>

      {/* Specifications */}

      <div className="overflow-hidden rounded-2xl border border-gray-100">
        {product.specifications.map((item, index) => (
          <div
            key={item.title}
            className={`grid grid-cols-1 border-b border-gray-100 last:border-none sm:grid-cols-3 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="border-b border-gray-100 px-4 py-3 font-semibold text-gray-700 sm:border-b-0 sm:border-l sm:px-6 sm:py-5">
              {item.title}
            </div>

            <div className="col-span-2 px-4 py-3 text-gray-600 sm:px-6 sm:py-5">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
