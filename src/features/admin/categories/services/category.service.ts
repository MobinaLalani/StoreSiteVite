import { API_BASE_URL, resolveImageUrl } from "@/src/lib/api";
import { Category } from "@/src/types/category";
import { Product } from "@/src/types/product";

const API_URL = `${API_BASE_URL}/categories`;

function normalizeCategory(category: Category): Category {
  return {
    ...category,
    slug: category.slug.replace(/^\/+/, ""),
    image: resolveImageUrl(category.image),
  };
}

async function parseResponse<T>(response: Response, message: string): Promise<T> {
  if (!response.ok) throw new Error(`${message} (${response.status})`);
  return response.json() as Promise<T>;
}

export async function getCategories(): Promise<Category[]> {
  const data = await parseResponse<Category[]>(await fetch(API_URL), "خطا در دریافت دسته‌بندی‌ها");
  return data.map(normalizeCategory);
}

export async function createCategory(data: Omit<Category, "id">): Promise<Category> {
  const category = await parseResponse<Category>(await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  }), "خطا در ایجاد دسته‌بندی");
  return normalizeCategory(category);
}

export async function updateCategory(id: number, data: Partial<Omit<Category, "id">>): Promise<Category> {
  const category = await parseResponse<Category>(await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  }), "خطا در ویرایش دسته‌بندی");
  return normalizeCategory(category);
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`خطا در حذف دسته‌بندی (${response.status})`);
}

export async function getCategoriesWithProducts(): Promise<(Category & { products: Product[] })[]> {
  const data = await parseResponse<(Category & { products: Product[] })[]>(
    await fetch(`${API_URL}?includeProducts=true`),
    "خطا در دریافت دسته‌بندی‌ها",
  );
  return data.map((category) => ({ ...normalizeCategory(category), products: category.products }));
}
