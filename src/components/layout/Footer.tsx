"use client";

import { motion } from "framer-motion";

import Container from "../ui/Container";

export default function Footer() {
  return (
    <motion.footer
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className="mt-14 border-t border-slate-200/70 bg-slate-950 text-white sm:mt-24"
    >
      <Container>
        <div className="flex min-h-40 flex-col items-center justify-center gap-5 py-8 text-center sm:flex-row sm:justify-between sm:text-right">
          <div>
            <h3 className="text-xl font-bold">NextShop</h3>

            <p className="mt-3 text-slate-400">تجربه مدرن خرید تجهیزات صنعتی</p>
          </div>

          <div className="text-slate-500">© 2026 اتصال گستر</div>
        </div>
      </Container>
    </motion.footer>
  );
}
