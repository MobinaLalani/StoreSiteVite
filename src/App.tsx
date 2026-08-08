import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Navigate, NavLink, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { FolderTree, LayoutDashboard, MessageCircle, Package, Settings } from "lucide-react";
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
import LoginForm from "@/src/features/admin/auth/components/LoginForm";
import { validateSession } from "@/src/lib/auth";
import {usePublicSettings}from"@/src/features/admin/settings/hooks/useSettings";
import { useProducts } from "@/src/features/admin/products/hooks/useProducts";
import ProductGridSkeleton from "@/src/features/products/components/skeletons/ProductGridSkeleton";
import {
  ProductGallery,
  ProductInfo,
  ProductDescription,
  ProductSpecifications,
  RelatedProducts,
} from "@/src/features/products/ProductDetails";

const ProductPage=lazy(()=>import("@/src/features/admin/products/ProductPage"));
const CategoryPage=lazy(()=>import("@/src/features/admin/categories/CategoryPage"));
const SettingsPage=lazy(()=>import("@/src/features/admin/settings/SettingsPage"));
const InquiriesPage=lazy(()=>import("@/src/features/admin/inquiries/InquiriesPage"));
const DashboardPage=lazy(()=>import("@/src/features/admin/dashboard/DashboardPage"));
const LazyPage=({children}:{children:ReactNode})=><Suspense fallback={<div className="grid min-h-64 place-items-center text-slate-400">در حال بارگذاری...</div>}>{children}</Suspense>;

function StoreLayout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return <div className="pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-0"><Header /><Navbar /><motion.div key={location.pathname} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.28,ease:[.22,1,.36,1]}}><Outlet /></motion.div><Footer /></div>;
}

function HomePage() {
  const{data}=usePublicSettings();
  return <><Hero />{data?.appearance.showCategories!==false&&<Categories />}{data?.appearance.showFeaturedProducts!==false&&<ProductSection title="جدیدترین محصولات" description="جدیدترین محصولات فروشگاه" />}</>;
}

function ProductDetailsPage() {
  const { slug = "" } = useParams();
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) return <main className="mx-auto max-w-7xl px-4 py-10"><ProductGridSkeleton count={2} /></main>;
  if (isError) return <main className="p-16 text-center"><h1 className="text-3xl font-bold">خطا در دریافت محصول</h1></main>;

  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    // React Router usually decodes params; keep the original value if it is malformed.
  }
  const normalizedSlug = decodedSlug.trim().toLocaleLowerCase("en-US");
  const product = products.find(
    (item) => item.slug.trim().toLocaleLowerCase("en-US") === normalizedSlug,
  );
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
  return <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(15,23,42,.10)] backdrop-blur-xl lg:hidden"><div className="mx-auto flex h-[4.25rem] max-w-lg px-1"><NavLink end to="/admin" className={itemClass}><LayoutDashboard size={20}/><span>داشبورد</span></NavLink><NavLink to="/admin/Products" className={itemClass}><Package size={20}/><span>محصولات</span></NavLink><NavLink to="/admin/Categories" className={itemClass}><FolderTree size={20}/><span>دسته‌ها</span></NavLink><NavLink to="/admin/inquiries" className={itemClass}><MessageCircle size={20}/><span>استعلام‌ها</span></NavLink><NavLink to="/admin/settings" className={itemClass}><Settings size={20}/><span>تنظیمات</span></NavLink></div></nav>;
}

function LoginPage() {
  return <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-6"><div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-500/25 blur-3xl"/><div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-3xl"/><motion.div initial={{opacity:0,y:24,scale:.97}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.55,ease:[.22,1,.36,1]}} className="premium-surface relative w-full max-w-md rounded-3xl p-5 shadow-2xl sm:p-8"><div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-xl font-black text-white shadow-lg shadow-red-500/25">اگ</div><h1 className="text-center text-2xl font-black text-slate-900 sm:text-3xl">ورود به مدیریت</h1><p className="mb-7 mt-2 text-center text-sm text-slate-500">مدیریت امن فروشگاه اتصال گستر</p><LoginForm /></motion.div></div>;
}

function NotFound() {
  return <main className="p-16 text-center"><h1 className="text-3xl font-bold">صفحه پیدا نشد</h1></main>;
}

export default function App() {
  return <Routes><Route path="/" element={<StoreLayout />}><Route index element={<HomePage />} /><Route path="home" element={<HomePage />} /><Route path="products" element={<ProductSection title="محصولات" description="همه محصولات فروشگاه" />} /><Route path="products/:slug" element={<ProductDetailsPage />} /><Route path="products/category/:slug" element={<CategoryProductsPage />} /></Route><Route path="/admin/login" element={<LoginPage />} /><Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}><Route index element={<LazyPage><DashboardPage/></LazyPage>} /><Route path="Products" element={<LazyPage><ProductPage/></LazyPage>} /><Route path="Categories" element={<LazyPage><CategoryPage/></LazyPage>} /><Route path="inquiries" element={<LazyPage><InquiriesPage/></LazyPage>} /><Route path="settings" element={<LazyPage><SettingsPage/></LazyPage>} /></Route><Route path="/404" element={<NotFound />} /><Route path="*" element={<Navigate to="/404" replace />} /></Routes>;
}
