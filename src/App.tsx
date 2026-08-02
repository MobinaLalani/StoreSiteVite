import { useEffect, useState, type ReactNode } from "react";
import { Navigate, NavLink, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { FolderTree, LayoutDashboard, Package, Store } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Header from "@/src/components/layout/Header";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import AdminHeader from "@/src/components/layout/admin/Header";
import Sidebar from "@/src/components/layout/admin/Sidebar";
import AdminFooter from "@/src/components/layout/admin/Footer";
import Hero from "@/src/features/home/hero/Hero";
import Categories from "@/src/features/home/Categories";
import ProductSection from "@/src/features/products/components/ProductSection/ProductSection";
import ProductCategoryPage from "@/src/features/products/productCategory";
import ProductPage from "@/src/features/admin/products/ProductPage";
import { CategoryPage } from "@/src/features/admin/categories";
import LoginForm from "@/src/features/admin/auth/components/LoginForm";
import { validateSession } from "@/src/lib/auth";
import { products } from "@/src/data/products";
import {
  ProductGallery,
  ProductInfo,
  ProductDescription,
  ProductSpecifications,
  RelatedProducts,
} from "@/src/features/products/ProductDetails";

function StoreLayout() {
  const location = useLocation();
  return <div className="pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-0"><Header /><Navbar /><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.28,ease:[.22,1,.36,1]}}><Outlet /></motion.div></AnimatePresence><Footer /></div>;
}

function HomePage() {
  return <><Hero /><Categories /><ProductSection title="جدیدترین محصولات" description="جدیدترین محصولات فروشگاه" /></>;
}

function ProductDetailsPage() {
  const { slug = "" } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFound />;
  const relatedProducts = products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4);
  return <main className="mx-auto max-w-7xl space-y-10 px-4 py-6 sm:space-y-14 sm:px-6 sm:py-10 lg:space-y-20"><section className="grid gap-8 lg:grid-cols-2 lg:gap-12"><ProductGallery product={product} /><ProductInfo product={product} /></section><ProductDescription product={product} /><ProductSpecifications product={product} /><RelatedProducts products={relatedProducts} /></main>;
}

function CategoryProductsPage() {
  const { slug = "" } = useParams();
  return <ProductCategoryPage slug={slug} />;
}

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  return <div className="admin-canvas flex min-h-dvh lg:h-screen"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="flex min-w-0 flex-1 flex-col overflow-hidden"><AdminHeader onMenu={() => setSidebarOpen(true)} /><main className="flex-1 overflow-y-auto p-4 pb-24 sm:p-6 sm:pb-24 lg:p-8"><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{opacity:0,y:14,scale:.995}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8}} transition={{duration:.25,ease:[.22,1,.36,1]}}><Outlet /></motion.div></AnimatePresence></main><AdminFooter /><AdminMobileNav /></div></div>;
}

function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">("loading");
  useEffect(() => {
    let active = true;
    validateSession().then((valid) => { if (active) setStatus(valid ? "allowed" : "denied"); });
    const unauthorized = () => setStatus("denied");
    window.addEventListener("auth:unauthorized", unauthorized);
    return () => { active = false; window.removeEventListener("auth:unauthorized", unauthorized); };
  }, []);
  if (status === "loading") return <div className="grid min-h-dvh place-items-center bg-gray-50"><div className="text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500"/><p className="mt-4 text-sm text-gray-500">در حال بررسی دسترسی...</p></div></div>;
  if (status === "denied") return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  return children;
}

function AdminMobileNav() {
  const itemClass = ({ isActive }: { isActive: boolean }) => `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium ${isActive ? "text-red-500" : "text-gray-500"}`;
  return <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(15,23,42,.10)] backdrop-blur-xl lg:hidden"><div className="mx-auto flex h-[4.25rem] max-w-md px-2"><NavLink end to="/admin" className={itemClass}><LayoutDashboard size={21}/><span>داشبورد</span></NavLink><NavLink to="/admin/Products" className={itemClass}><Package size={21}/><span>محصولات</span></NavLink><NavLink to="/admin/Categories" className={itemClass}><FolderTree size={21}/><span>دسته‌بندی</span></NavLink><NavLink to="/" className={itemClass}><Store size={21}/><span>فروشگاه</span></NavLink></div></nav>;
}

function LoginPage() {
  return <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-6"><div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-500/25 blur-3xl"/><div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-3xl"/><motion.div initial={{opacity:0,y:24,scale:.97}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.55,ease:[.22,1,.36,1]}} className="premium-surface relative w-full max-w-md rounded-3xl p-5 shadow-2xl sm:p-8"><div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-xl font-black text-white shadow-lg shadow-red-500/25">اگ</div><h1 className="text-center text-2xl font-black text-slate-900 sm:text-3xl">ورود به مدیریت</h1><p className="mb-7 mt-2 text-center text-sm text-slate-500">مدیریت امن فروشگاه اتصال گستر</p><LoginForm /></motion.div></div>;
}

function NotFound() {
  return <main className="p-16 text-center"><h1 className="text-3xl font-bold">صفحه پیدا نشد</h1></main>;
}

export default function App() {
  return <Routes><Route path="/" element={<StoreLayout />}><Route index element={<HomePage />} /><Route path="home" element={<HomePage />} /><Route path="products" element={<ProductSection title="محصولات" description="همه محصولات فروشگاه" />} /><Route path="products/:slug" element={<ProductDetailsPage />} /><Route path="products/category/:slug" element={<CategoryProductsPage />} /></Route><Route path="/admin/login" element={<LoginPage />} /><Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}><Route index element={<div>پنل مدیریت فروشگاه</div>} /><Route path="Products" element={<ProductPage />} /><Route path="Categories" element={<CategoryPage />} /></Route><Route path="/404" element={<NotFound />} /><Route path="*" element={<Navigate to="/404" replace />} /></Routes>;
}
