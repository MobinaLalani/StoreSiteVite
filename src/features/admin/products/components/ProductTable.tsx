"use client";

import Image from "@/src/components/ui/AppImage";
import { Pencil, Trash2, Package, Star } from "lucide-react";

import DataTable, {
  Column,
} from "@/src/features/admin/shared/components/DataTable";

import { Product } from "@/src/types/product";

interface ProductTableProps {
  products: Product[];

  loading?: boolean;

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,

  loading,

  onEdit,

  onDelete,
}: ProductTableProps) {
  const columns: Column<Product>[] = [
    {
      key: "thumbnail",

      title: "تصویر",

      width: "110px",

      render: (product) => (
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={60}
          height={60}
          className="
            rounded-xl
            border
            object-cover
          "
        />
      ),
    },

    {
      key: "title",

      title: "عنوان",

      render: (product) => (
        <div>
          <p className="font-semibold text-gray-900">{product.title}</p>

          <span
            className="
            rounded-lg
            bg-gray-100
            px-2
            py-1
            text-xs
            text-gray-500
          "
          >
            {product.sku}
          </span>
        </div>
      ),
    },

    {
      key: "brand",

      title: "برند",

      render: (product) => (
        <span className="text-gray-700">{product.brand}</span>
      ),
    },

    {
      key: "price",

      title: "قیمت",

      render: (product) => (
        <div className="flex flex-col">
          <span
            className="
            font-semibold
            text-gray-900
          "
          >
            {product.price.toLocaleString()}
            تومان
          </span>

          {product.oldPrice && (
            <span
              className="
                text-xs
                text-gray-400
                line-through
              "
            >
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      ),
    },

    {
      key: "stock",

      title: "موجودی",

      render: (product) => (
        <span
          className={`
            rounded-lg
            px-3
            py-1
            text-xs
            font-medium

            ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {product.stock > 0 ? `${product.stock} عدد` : "ناموجود"}
        </span>
      ),
    },

    {
      key: "status",

      title: "وضعیت",

      render: (product) => (
        <span
          className={`
            rounded-lg
            px-3
            py-1
            text-xs
            font-medium

            ${
              product.status === "active"
                ? "bg-green-100 text-green-700"
                : product.status === "draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
            }
          `}
        >
          {product.status === "active"
            ? "فعال"
            : product.status === "draft"
              ? "پیش‌نویس"
              : "آرشیو"}
        </span>
      ),
    },

    {
      key: "isFeatured",

      title: "ویژه",

      render: (product) =>
        product.isFeatured ? (
          <span
            className="
          rounded-lg
          bg-blue-100
          px-3
          py-1
          text-xs
          text-blue-700
        "
          >
            ویژه
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },

    {
      key: "actions",

      title: "عملیات",

      width: "140px",

      render: (product) => (
        <div
          className="
          flex
          justify-center
          gap-2
        "
        >
          <button
            onClick={() => onEdit(product)}
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
            onClick={() => onDelete(product)}
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

  if (loading) return <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-sm">در حال دریافت محصولات...</div>;
  if (!products.length) return <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-gray-500"><Package className="mx-auto mb-3 text-gray-300" size={42}/><p>هیچ محصولی وجود ندارد.</p></div>;

  return <>
    <div className="grid gap-3 md:hidden">
      {products.map((product) => <article key={product.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex gap-3 p-4">
          <Image src={product.thumbnail} alt={product.title} width={84} height={84} className="h-21 w-21 shrink-0 rounded-2xl border bg-gray-50 object-contain p-1" />
          <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><h3 className="truncate font-bold text-gray-900">{product.title}</h3><p className="mt-1 truncate text-xs text-gray-400">{product.brand} • {product.sku}</p></div>{product.isFeatured&&<Star size={18} className="shrink-0 fill-amber-400 text-amber-400"/>}</div><p className="mt-3 font-bold text-red-600">{product.price.toLocaleString("fa-IR")} <span className="text-xs font-normal">تومان</span></p></div>
        </div>
        <div className="grid grid-cols-2 border-y bg-gray-50/70 text-sm"><div className="border-l p-3"><span className="text-gray-400">موجودی</span><b className={`mr-2 ${product.stock>0?"text-green-600":"text-red-600"}`}>{product.stock>0?`${product.stock} عدد`:"ناموجود"}</b></div><div className="p-3"><span className="text-gray-400">وضعیت</span><b className="mr-2 text-gray-700">{product.status==="active"?"فعال":product.status==="draft"?"پیش‌نویس":"آرشیو"}</b></div></div>
        <div className="grid grid-cols-2 gap-3 p-3"><button onClick={()=>onEdit(product)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-50 font-semibold text-blue-700 active:scale-[.98]"><Pencil size={18}/>ویرایش</button><button onClick={()=>onDelete(product)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-50 font-semibold text-red-600 active:scale-[.98]"><Trash2 size={18}/>حذف</button></div>
      </article>)}
    </div>
    <div className="hidden md:block"><DataTable<Product> columns={columns} data={products} emptyMessage="هیچ محصولی وجود ندارد." /></div>
  </>;
}
