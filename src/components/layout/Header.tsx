"use client";

import { motion } from "framer-motion";
import { ShoppingCart, User, Search } from "lucide-react";

import Container from "../ui/Container";

export default function Header() {
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
      className="border-b bg-white"
    >
      <Container>
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-3 sm:h-20 sm:flex-nowrap sm:py-0">
          <h1 className="whitespace-nowrap text-xl font-black text-red-500 sm:text-3xl">اتصال گستر</h1>

          <div className="order-3 flex w-full items-center rounded-xl border bg-gray-50 px-3 sm:order-none sm:max-w-xl sm:px-4">
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
