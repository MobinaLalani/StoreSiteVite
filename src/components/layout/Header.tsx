"use client";

import { motion } from "framer-motion";
import { ShoppingCart, User, Search } from "lucide-react";

import Container from "../ui/Container";
import{usePublicSettings}from"@/src/features/admin/settings/hooks/useSettings";

export default function Header() {
  const{data}=usePublicSettings();
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="sticky top-0 z-40 border-b border-white/60 bg-white/80 shadow-[0_10px_40px_-28px_rgba(15,23,42,.6)] backdrop-blur-xl"
    >
      <Container>
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-3 sm:h-20 sm:flex-nowrap sm:py-0">
          <h1 className="whitespace-nowrap bg-gradient-to-l from-red-500 to-red-700 bg-clip-text text-xl font-black text-transparent sm:text-3xl">{data?.store.name||"اتصال گستر"}</h1>

          <div className="order-3 flex w-full items-center rounded-2xl border border-slate-200/80 bg-slate-50/80 px-3 shadow-inner transition focus-within:border-red-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-100 sm:order-none sm:max-w-xl sm:px-4">
            <Search size={20} className="text-gray-500" />

            <input
              placeholder="جستجوی محصولات..."
              className="h-11 w-full min-w-0 bg-transparent px-3 outline-none sm:h-12"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="grid h-11 w-11 place-items-center rounded-xl hover:bg-gray-100"
            >
              <ShoppingCart />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="grid h-11 w-11 place-items-center rounded-xl hover:bg-gray-100"
            >
              <User />
            </motion.button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
