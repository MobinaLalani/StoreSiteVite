"use client";

import { Bell, Search, UserCircle2, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearSession } from "@/src/lib/auth";

export default function Header({ onMenu }: { onMenu?: () => void }) {
  const navigate = useNavigate();
  function logout() { clearSession(); navigate("/admin/login", { replace: true }); }
  return (
    <header className="flex min-h-16 items-center justify-between gap-3 border-b border-white/60 bg-white/80 px-4 shadow-sm backdrop-blur-xl sm:h-20 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onMenu} aria-label="باز کردن منو" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gray-100 lg:hidden"><Menu size={22}/></button>
        <div className="min-w-0"><h2 className="truncate text-lg font-bold sm:text-2xl">داشبورد</h2>

        <p className="hidden text-sm text-gray-500 sm:block">خوش آمدید</p></div>
      </div>

      <div className="flex items-center gap-2 sm:gap-5">
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-3 text-gray-400" size={18} />

          <input
            placeholder="جستجو..."
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 pr-10 pl-4 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
          />
        </div>

        <button className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-gray-200">
          <Bell size={20} />
        </button>

        <button className="flex items-center gap-2">
          <UserCircle2 className="h-9 w-9 sm:h-10 sm:w-10" />

          <div className="hidden text-right sm:block">
            <p className="font-semibold">Mobina</p>

            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        </button>
        <button onClick={logout} title="خروج" className="grid h-11 w-11 place-items-center rounded-full bg-red-50 text-red-600 hover:bg-red-100"><LogOut size={19}/></button>
      </div>
    </header>
  );
}
