import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";

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
import { products } from "@/src/data/products";
import {
  ProductGallery,
  ProductInfo,
  ProductDescription,
  ProductSpecifications,
  RelatedProducts,
} from "@/src/features/products/ProductDetails";

function StoreLayout() {
  return <><Header /><Navbar /><Outlet /><Footer /></>;
}

function HomePage() {
  return <><Hero /><Categories /><ProductSection title="جدیدترین محصولات" description="جدیدترین محصولات فروشگاه" /></>;
}

function ProductDetailsPage() {
  const { slug = "" } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFound />;
  const relatedProducts = products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4);
  return <main className="mx-auto max-w-7xl space-y-20 px-4 py-10"><section className="grid gap-12 lg:grid-cols-2"><ProductGallery product={product} /><ProductInfo product={product} /></section><ProductDescription product={product} /><ProductSpecifications product={product} /><RelatedProducts products={relatedProducts} /></main>;
}

function CategoryProductsPage() {
  const { slug = "" } = useParams();
  return <ProductCategoryPage slug={slug} />;
}

function AdminLayout() {
  return <div className="flex h-screen bg-gray-50"><Sidebar /><div className="flex flex-1 flex-col overflow-hidden"><AdminHeader /><main className="flex-1 overflow-y-auto p-8"><Outlet /></main><AdminFooter /></div></div>;
}

function LoginPage() {
  return <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6"><div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"><h1 className="mb-8 text-center text-3xl font-bold">پنل مدیریت</h1><LoginForm /></div></div>;
}

function NotFound() {
  return <main className="p-16 text-center"><h1 className="text-3xl font-bold">صفحه پیدا نشد</h1></main>;
}

export default function App() {
  return <Routes><Route path="/" element={<StoreLayout />}><Route index element={<HomePage />} /><Route path="home" element={<HomePage />} /><Route path="products" element={<ProductSection title="محصولات" description="همه محصولات فروشگاه" />} /><Route path="products/:slug" element={<ProductDetailsPage />} /><Route path="products/category/:slug" element={<CategoryProductsPage />} /></Route><Route path="/admin/login" element={<LoginPage />} /><Route path="/admin" element={<AdminLayout />}><Route index element={<div>پنل مدیریت فروشگاه</div>} /><Route path="Products" element={<ProductPage />} /><Route path="Categories" element={<CategoryPage />} /></Route><Route path="/404" element={<NotFound />} /><Route path="*" element={<Navigate to="/404" replace />} /></Routes>;
}
