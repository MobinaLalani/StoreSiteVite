"use client";

import { Plus } from "lucide-react";

import SearchInput from "@/src/features/admin/shared/components/SearchInput";

interface ProductToolbarProps {
  search: string;

  onSearchChange: (value: string) => void;

  onAddProduct: () => void;
}

export default function ProductToolbar({
  search,

  onSearchChange,

  onAddProduct,
}: ProductToolbarProps) {
  return (
    <div
      className="
        mb-6
        flex
        flex-col
        gap-4
        rounded-2xl
        border border-white/80
        bg-white/90
        p-4
        sm:p-5
        shadow-[0_18px_50px_-38px_rgba(15,23,42,.6)]
        backdrop-blur
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="جستجوی محصول..."
      />

      <button
        onClick={onAddProduct}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-l from-red-500 to-red-600
          px-5
          min-h-12
          py-3
          text-white
          transition
          shadow-lg shadow-red-500/20 hover:-translate-y-0.5 hover:shadow-red-500/30
        "
      >
        <Plus size={18} />
        افزودن محصول
      </button>
    </div>
  );
}
