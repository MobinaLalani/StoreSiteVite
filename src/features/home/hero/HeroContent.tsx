"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  PhoneCall,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";

export default function HeroContent() {
  return (
    <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-right">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
      >
        <BadgeCheck size={18} />
        عرضه مستقیم تجهیزات صنعتی
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-extrabold leading-[1.45] text-slate-900 sm:text-4xl lg:text-6xl"
      >
        کیفیتی که
        <span className="mx-2 text-red-500">اعتماد</span>
        می‌سازد
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-5 text-base leading-8 text-gray-600 sm:mt-6 sm:text-lg sm:leading-9"
      >
        تامین و فروش انواع تجهیزات صنعتی، ساختمانی و ابزارآلات با تضمین کیفیت،
        ارسال سریع و پشتیبانی تخصصی.
      </motion.p>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-7 grid grid-cols-1 gap-3 text-right min-[380px]:grid-cols-2 sm:mt-8 sm:gap-4"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-green-500" size={20} />
          <span>ضمانت اصالت کالا</span>
        </div>

        <div className="flex items-center gap-3">
          <Truck className="text-blue-500" size={20} />
          <span>ارسال سریع</span>
        </div>

        <div className="flex items-center gap-3">
          <Headphones className="text-orange-500" size={20} />
          <span>مشاوره تخصصی</span>
        </div>

        <div className="flex items-center gap-3">
          <BadgeCheck className="text-red-500" size={20} />
          <span>قیمت رقابتی</span>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <button className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 sm:flex-none sm:px-8 sm:py-4">
          مشاهده محصولات
          <ArrowLeft size={18} />
        </button>

        <button className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-300 px-4 py-3 font-semibold transition hover:bg-slate-100 sm:flex-none sm:px-8 sm:py-4">
          <PhoneCall size={18} />
          تماس با ما
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 grid grid-cols-3 gap-2 border-t pt-6 text-center sm:mt-14 sm:gap-8 sm:pt-8 lg:text-right"
      >
        <div>
          <h3 className="text-3xl font-extrabold text-red-500">+250</h3>
          <p className="mt-1 text-sm text-gray-500">محصول فعال</p>
        </div>

        <div>
          <h3 className="text-3xl font-extrabold text-red-500">+1500</h3>
          <p className="mt-1 text-sm text-gray-500">مشتری راضی</p>
        </div>

        <div>
          <h3 className="text-3xl font-extrabold text-red-500">+8</h3>
          <p className="mt-1 text-sm text-gray-500">سال تجربه</p>
        </div>
      </motion.div>
    </div>
  );
}
