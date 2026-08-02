"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  ShoppingBag,
  Menu,
  House,
  Boxes,
  UserRound,
  X,
} from "lucide-react";

import Container from "../ui/Container";
import Link from "../ui/AppLink";

import { useCategoriesWithProducts } from "@/src/features/admin/categories/hooks/useCategoriesWithProducts";
import { Product } from "@/src/types/product";
import { Category } from "@/src/types/category";

const links = [
  "موبایل",
  "لپ تاپ",
  "ساعت",
  "هدفون",
  "دوربین",
  "گیمینگ",
  "سوپرمارکت",
];

const categoryIcons = {
  mobile: Smartphone,
  laptop: Laptop,
  headphone: Headphones,
  watch: Watch,
  camera: Camera,
  gaming: Gamepad2,
  bag: ShoppingBag,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { data: categories = [], isLoading } = useCategoriesWithProducts();

  const [activeId, setActiveId] = useState<number | null>(null);

  const active =
    categories.find((item:Category) => item.id === activeId) ?? categories[0];

  const mobileItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition ${
      isActive ? "text-red-500" : "text-slate-500"
    }`;

  return (
    <>
    <nav className="relative hidden border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-xl lg:block">
      <Container>
        <div className="flex min-h-14 items-center justify-between gap-4 py-2 lg:justify-start lg:gap-10 lg:py-0">
          {/* Category Button */}
          <div
            className="relative"
            onMouseEnter={() => window.innerWidth >= 1024 && setOpen(true)}
            onMouseLeave={() => window.innerWidth >= 1024 && setOpen(false)}
          >
            <button onClick={() => setOpen((value) => !value)} className="flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-l from-red-500 to-red-600 px-4 py-2 font-semibold text-white shadow-lg shadow-red-500/15 transition hover:-translate-y-0.5 hover:shadow-red-500/25">
              <Menu size={18} />
              دسته بندی ها
              <ChevronDown
                size={18}
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="premium-surface absolute right-0 top-14 z-50 hidden h-[420px] w-[720px] overflow-hidden rounded-3xl lg:flex"
                >
                  {/* Left */}
                  <div className="w-64 border-l bg-gray-50">
                    {isLoading ? (
                      <div className="p-5">در حال دریافت...</div>
                    ) : (
                      categories.map((category: Category) => {
                        const Icon =
                          categoryIcons[
                            category.slug as keyof typeof categoryIcons
                          ] ?? Menu;

                        return (
                          <button
                            key={category.id}
                            onMouseEnter={() => setActiveId(category.id)}
                            className={`flex w-full items-center gap-3 px-5 py-4 text-right transition ${
                              active?.id === category.id
                                ? "bg-white font-bold text-red-600"
                                : "hover:bg-white"
                            }`}
                          >
                            <Icon size={20} />

                            {category.title}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Right */}
                  <motion.div
                    key={active?.id}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="flex-1 p-8"
                  >
                    <h3 className="mb-6 text-xl font-bold">{active?.title}</h3>

                    <div className="grid grid-cols-2 gap-4">
                      {active?.products?.map((product:Product) => (
                        <motion.div
                          key={product.id}
                          whileHover={{
                            x: -5,
                          }}
                          className="cursor-pointer rounded-xl bg-gray-50 p-4 transition hover:bg-red-50 hover:text-red-600"
                        >
                          {product.title}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Normal Links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((item) => (
              <motion.li
                key={item}
                whileHover={{
                  y: -3,
                  color: "#ef4444",
                }}
                transition={{
                  duration: 0.5,
                }}
                className="cursor-pointer text-sm font-medium"
              >
                {item}
              </motion.li>
            ))}
          </ul>
          <Link href="/products" className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 lg:hidden">همه محصولات</Link>
        </div>
        <AnimatePresence>
          {open && <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden lg:hidden"><div className="grid grid-cols-2 gap-2 border-t py-3">{categories.map((category:Category)=><Link key={category.id} href={`/products/category/${category.slug.replace(/^\//,"")}`} onClick={()=>setOpen(false)} className="flex min-h-12 items-center gap-2 rounded-xl bg-gray-50 px-3 text-sm font-medium"><Menu size={17}/><span className="truncate">{category.title}</span></Link>)}</div></motion.div>}
        </AnimatePresence>
      </Container>
    </nav>
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="بستن دسته‌بندی‌ها"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[55] bg-black/35 backdrop-blur-[2px] lg:hidden"
          />
          <motion.section
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-[60] max-h-[65dvh] overflow-y-auto rounded-t-3xl bg-white px-4 pb-5 pt-3 shadow-2xl lg:hidden"
          >
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-200" />
            <div className="mb-4 flex items-center justify-between">
              <div><h2 className="text-lg font-black">دسته‌بندی‌ها</h2><p className="text-xs text-slate-400">دسته موردنظر را انتخاب کنید</p></div>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"><X size={19}/></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category: Category) => {
                const Icon = categoryIcons[category.slug.replace(/^\//, "") as keyof typeof categoryIcons] ?? Menu;
                return <Link key={category.id} href={`/products/category/${category.slug.replace(/^\//, "")}`} onClick={() => setOpen(false)} className="flex min-h-14 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 text-sm font-semibold active:scale-[.98]"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-red-500"><Icon size={18}/></span><span className="truncate">{category.title}</span></Link>;
              })}
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
    <nav className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/70 bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgba(15,23,42,.13)] backdrop-blur-2xl lg:hidden">
      <div className="mx-auto flex h-[4.25rem] max-w-md items-stretch px-2">
        <NavLink to="/" end className={mobileItemClass}><House size={21}/><span>خانه</span></NavLink>
        <NavLink to="/products" className={mobileItemClass}><ShoppingBag size={21}/><span>محصولات</span></NavLink>
        <button onClick={() => setOpen((value) => !value)} className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition ${open ? "text-red-500" : "text-slate-500"}`}><span className={`grid h-10 w-10 place-items-center rounded-2xl transition ${open ? "bg-red-500 text-white" : "bg-red-50 text-red-500"}`}><Boxes size={21}/></span><span>دسته‌بندی</span></button>
        <NavLink to="/admin" className={mobileItemClass}><UserRound size={21}/><span>مدیریت</span></NavLink>
      </div>
    </nav>
    </>
  );
}
