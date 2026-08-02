"use client";

import { useState } from "react";
import Image from "@/src/components/ui/AppImage";
import { motion } from "framer-motion";

import { Product } from "@/src/types/product";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <motion.div
        layout
        className="flex h-[320px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 sm:h-[420px] sm:rounded-3xl sm:p-6 lg:h-[520px] lg:p-8"
      >
        <Image
          src={selectedImage}
          alt={product.title}
          width={450}
          height={450}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 sm:gap-4">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`shrink-0 overflow-hidden rounded-xl border transition sm:rounded-2xl ${
              selectedImage === image ? "border-red-500" : "border-gray-200"
            }`}
          >
            <Image
              src={image}
              alt={`${product.title}-${index}`}
              width={90}
              height={90}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
