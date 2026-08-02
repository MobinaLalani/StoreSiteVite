"use client";

import Link from "@/src/components/ui/AppLink";
import { useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
  X,
} from "lucide-react";

const menu = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "کتگوری محصولات",
    href: "/admin/Categories",
    icon: Package,
  },
  {
    title: "محصولات",
    href: "/admin/Products",
    icon: FolderTree,
  },
  {
    title: "سفارش ها",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "کاربران",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "تنظیمات",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface SidebarProps { open?: boolean; onClose?: () => void; }

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = useLocation().pathname;

  return (
    <>
    {open && <button aria-label="بستن منو" onClick={onClose} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" />}
    <aside className={`fixed inset-y-0 right-0 z-50 w-[min(82vw,18rem)] border-l border-slate-800 bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:static lg:z-auto lg:w-72 lg:translate-x-0 lg:shadow-none ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center justify-between"><div><h1 className="text-2xl font-black">اتصال <span className="text-red-500">گستر</span></h1><p className="mt-1 text-xs text-slate-500">پنل مدیریت فروشگاه</p></div><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 lg:hidden"><X size={20}/></button></div>
      </div>

      <nav className="space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

              ${
                active
                  ? "bg-gradient-to-l from-red-500 to-red-600 text-white shadow-lg shadow-red-950/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }
              `}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
    </>
  );
}
