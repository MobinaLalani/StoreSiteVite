"use client";

import Image from "@/src/components/ui/AppImage";
import { Pencil, Trash2, FolderOpen } from "lucide-react";

import DataTable, {
  Column,
} from "@/src/features/admin/shared/components/DataTable";

import { Category } from "@/src/types/category";

interface CategoryTableProps {
  categories: Category[];
  loading?: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const columns: Column<Category>[] = [
    {
      key: "image",
      title: "تصویر",
      width: "110px",
      render: (category) => (
        <Image
          src={category.image}
          alt={category.title}
          width={60}
          height={60}
          className="rounded-xl border object-cover"
        />
      ),
    },

    {
      key: "title",
      title: "عنوان",
      render: (category) => (
        <span className="font-semibold text-gray-900">{category.title}</span>
      ),
    },

    {
      key: "slug",
      title: "Slug",
      render: (category) => (
        <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium">
          {category.slug}
        </span>
      ),
    },

    {
      key: "description",
      title: "توضیحات",
      render: (category) => (
        <p className="max-w-sm truncate text-gray-500">
          {category.description}
        </p>
      ),
    },

    {
      key: "actions",
      title: "عملیات",
      width: "140px",
      render: (category) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(category)}
            className="
                rounded-lg
                bg-blue-50
                p-2
                text-blue-600
                transition
                hover:bg-blue-100
            "
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(category)}
            className="
                rounded-lg
                bg-red-50
                p-2
                text-red-600
                transition
                hover:bg-red-100
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-sm">در حال دریافت دسته‌بندی‌ها...</div>;
  if (!categories.length) return <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-gray-500"><FolderOpen className="mx-auto mb-3 text-gray-300" size={42}/><p>هیچ دسته‌بندی‌ای وجود ندارد.</p></div>;

  return <>
    <div className="grid gap-3 md:hidden">
      {categories.map((category)=><article key={category.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex gap-3 p-4"><Image src={category.image} alt={category.title} width={80} height={80} className="h-20 w-20 shrink-0 rounded-2xl border bg-gray-50 object-cover"/><div className="min-w-0 flex-1"><h3 className="font-bold text-gray-900">{category.title}</h3><span className="mt-1 inline-block max-w-full truncate rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-500" dir="ltr">{category.slug}</span><p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">{category.description}</p></div></div>
        <div className="grid grid-cols-2 gap-3 border-t p-3"><button onClick={()=>onEdit(category)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-50 font-semibold text-blue-700 active:scale-[.98]"><Pencil size={18}/>ویرایش</button><button onClick={()=>onDelete(category)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-50 font-semibold text-red-600 active:scale-[.98]"><Trash2 size={18}/>حذف</button></div>
      </article>)}
    </div>
    <div className="hidden md:block"><DataTable<Category> columns={columns} data={categories} emptyMessage="هیچ دسته‌بندی‌ای وجود ندارد." /></div>
  </>;
}
