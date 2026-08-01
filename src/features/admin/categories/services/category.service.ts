import { Category } from "@/src/types/category";

const BASE_URL = "/api/categories";
const BASE_URL2 = "http://localhost/phpStoreSite/categories";
export async function getCategories() {
  const response = await fetch(BASE_URL2);

  if (!response.ok) {
    throw new Error("Failed");
  }

  return response.json();
}

export async function createCategory(
  data: Omit<Category, "id">,
): Promise<Category> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create category.");
  }

  return response.json();
}

export async function updateCategory(
  id: number,
  data: Partial<Omit<Category, "id">>,
): Promise<Category> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    console.log(error);

    throw new Error(error);
  }

  return response.json();
}
export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category.");
  }
}

export async function getCategoriesWithProducts() {
  const response = await fetch("/api/categories?includeProducts=true");

  if (!response.ok) {
    throw new Error("Failed to fetch categories with products.");
  }

  return response.json();
}