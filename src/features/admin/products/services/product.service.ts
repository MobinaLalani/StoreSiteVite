import { products as initialProducts } from "@/src/data/products";
import { Product } from "@/src/types/product";

const STORAGE_KEY = "store_products";

function readProducts(): Product[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return [...initialProducts];
  }
  return JSON.parse(saved) as Product[];
}

function writeProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export async function getProducts(): Promise<Product[]> {
  return readProducts();
}

export async function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
  const products = readProducts();
  const now = new Date().toISOString();
  const product: Product = { ...data, id: Math.max(0, ...products.map((item) => item.id)) + 1, createdAt: now, updatedAt: now };
  writeProducts([...products, product]);
  return product;
}

export async function updateProduct(id: number, data: Partial<Omit<Product, "id">>): Promise<Product> {
  const products = readProducts();
  const current = products.find((item) => item.id === id);
  if (!current) throw new Error("محصول پیدا نشد.");
  const updated = { ...current, ...data, id, updatedAt: new Date().toISOString() };
  writeProducts(products.map((item) => item.id === id ? updated : item));
  return updated;
}

export async function deleteProduct(id: number): Promise<void> {
  writeProducts(readProducts().filter((item) => item.id !== id));
}

export const productService = { getProducts, createProduct, updateProduct, deleteProduct };
