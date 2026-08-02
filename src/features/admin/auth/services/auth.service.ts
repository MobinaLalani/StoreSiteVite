import { API_BASE_URL } from "@/src/lib/api";
import { saveSession, type LoginResponse } from "@/src/lib/auth";
import { LoginFormValues } from "../validations/login.schema";

export async function login(data: LoginFormValues) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  const payload = await response.json() as LoginResponse & { message?: string };
  if (!response.ok) throw new Error(payload.message || "ورود ناموفق بود.");
  saveSession(payload);
  return payload;
}
