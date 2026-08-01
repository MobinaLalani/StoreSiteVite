import { categories as initialCategories } from "@/src/data/categories";
import { products as initialProducts } from "@/src/data/products";
import { Category } from "@/src/types/category";
import { Product } from "@/src/types/product";

const STORAGE_KEY = "store_categories";
const API_URL = "http://etesalgostarr.ir/phpStoreSite/categories";
const ASSET_ORIGIN = "http://etesalgostarr.ir";

function normalizeCategory(category: Category): Category {
  return {
    ...category,
    slug: category.slug.replace(/^\/+/, ""),
    image: category.image.startsWith("http")
      ? category.image
      : `${ASSET_ORIGIN}${category.image.startsWith("/") ? "" : "/"}${category.image}`,
  };
}

function readCategories(): Category[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCategories));
    return [...initialCategories];
  }
  return JSON.parse(saved) as Category[];
}

function writeCategories(categories: Category[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(API_URL, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`دریافت دسته‌بندی‌ها ناموفق بود (${response.status}).`);
    }

    const categories = await response.json() as Category[];
    if (categories.length > 0) {
      return categories.map(normalizeCategory);
    }
  } catch (error) {
    console.error("Category API error; using fallback data.", error);
  }

  return initialCategories.map(normalizeCategory);
}

export async function createCategory(data: Omit<Category, "id">): Promise<Category> {
  const categories = readCategories();
  const category = { ...data, id: Math.max(0, ...categories.map((item) => item.id)) + 1 };
  writeCategories([...categories, category]);
  return category;
}

export async function updateCategory(id: number, data: Partial<Omit<Category, "id">>): Promise<Category> {
  const categories = readCategories();
  const current = categories.find((item) => item.id === id);
  if (!current) throw new Error("دسته‌بندی پیدا نشد.");
  const updated = { ...current, ...data, id };
  writeCategories(categories.map((item) => item.id === id ? updated : item));
  return updated;
}

export async function deleteCategory(id: number): Promise<void> {
  writeCategories(readCategories().filter((item) => item.id !== id));
}

export async function getCategoriesWithProducts(): Promise<(Category & { products: Product[] })[]> {
  const savedProducts = localStorage.getItem("store_products");
  const products = savedProducts ? JSON.parse(savedProducts) as Product[] : initialProducts;
  const categories = await getCategories();
  return categories.map((category) => ({
    ...category,
    products: products.filter((product) => product.categoryId === category.id),
  }));
}
