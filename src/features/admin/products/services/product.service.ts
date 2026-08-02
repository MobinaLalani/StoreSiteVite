import { API_BASE_URL } from "@/src/lib/api";
import { authFetch } from "@/src/lib/auth";
import type { Product } from "@/src/types/product";

type ProductCreateInput = Omit<Product, "id" | "createdAt" | "updatedAt">;
type ProductUpdateInput = Partial<Omit<Product, "id">>;

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string>;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await authFetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    let payload: ApiErrorResponse = {};

    try {
      payload = (await response.json()) as ApiErrorResponse;
    } catch {
      // Some server errors may not contain a JSON body.
    }

    const validationMessage = payload.errors
      ? Object.values(payload.errors).join("، ")
      : "";

    throw new Error(
      validationMessage ||
        payload.message ||
        `خطا در ارتباط با سرور (${response.status})`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function jsonRequest(method: "POST" | "PUT", data: unknown): RequestInit {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>("/products");
}

export function createProduct(data: ProductCreateInput): Promise<Product> {
  return request<Product>("/products", jsonRequest("POST", data));
}

export function updateProduct(
  id: number,
  data: ProductUpdateInput,
): Promise<Product> {
  return request<Product>(`/products/${id}`, jsonRequest("PUT", data));
}

export function deleteProduct(id: number): Promise<void> {
  return request<void>(`/products/${id}`, {
    method: "DELETE",
  });
}

export const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
