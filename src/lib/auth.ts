import { API_BASE_URL } from "./api";

const TOKEN_KEY = "admin_access_token";
const USER_KEY = "admin_user";

export interface AuthUser { username: string; expiresAt?: number; }
export interface LoginResponse { token: string; tokenType: "Bearer"; expiresIn: number; user: AuthUser; }

export function getAccessToken() { return sessionStorage.getItem(TOKEN_KEY); }
export function saveSession(response: LoginResponse) { sessionStorage.setItem(TOKEN_KEY, response.token); sessionStorage.setItem(USER_KEY, JSON.stringify(response.user)); }
export function clearSession() { sessionStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(USER_KEY); }

export async function authFetch(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(input, { ...init, headers });
  if (response.status === 401) { clearSession(); window.dispatchEvent(new Event("auth:unauthorized")); }
  return response;
}

export async function validateSession(): Promise<boolean> {
  if (!getAccessToken()) return false;
  try { const response = await authFetch(`${API_BASE_URL}/auth/me`); return response.ok; }
  catch { return false; }
}
