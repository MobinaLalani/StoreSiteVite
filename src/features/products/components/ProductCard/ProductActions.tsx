"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { MessageCircle, PhoneCall, X } from "lucide-react";
import { SALES_CONTACT, whatsappUrl } from "@/src/config/contact";

interface ProductActionsProps { productTitle?: string; variant?: "card" | "detail"; }

export default function ProductActions({ productTitle, variant = "card" }: ProductActionsProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className={`interactive-sheen flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-red-500 to-red-600 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-red-500/30 ${variant === "detail" ? "min-h-14 px-6 py-4 text-base" : "py-4"}`}
      >
        <PhoneCall size={20} />
        استعلام قیمت
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-end justify-center p-0 sm:items-center sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />

                {/* Modal */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                    استعلام قیمت
                    </h2>

                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <p className="mb-6 text-sm text-gray-500">
                    برای دریافت قیمت روز «{productTitle || "محصول"}» تماس بگیرید یا در واتساپ پیام دهید.
                  </p>

                  <div className="space-y-4">
                    <a
                      href={SALES_CONTACT.landlineHref}
                      className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-gray-50"
                    >
                      <PhoneCall className="text-red-500" />
                      <span dir="ltr">{SALES_CONTACT.landlineDisplay}</span>
                    </a>

                    <a
                      href={SALES_CONTACT.mobileHref}
                      className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-gray-50"
                    >
                      <PhoneCall className="text-red-500" />
                      <span dir="ltr">{SALES_CONTACT.mobileDisplay}</span>
                    </a>
                    <a href={whatsappUrl(productTitle)} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-center gap-3 rounded-xl bg-emerald-500 p-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"><MessageCircle/><span>استعلام در واتساپ</span></a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
