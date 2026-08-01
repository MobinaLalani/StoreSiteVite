import { LoginFormValues } from "../validations/login.schema";

export async function login(data: LoginFormValues) {
  if (data.username !== "admin" || data.password !== "12345") {
    throw new Error("نام کاربری یا رمز عبور اشتباه است.");
  }

  sessionStorage.setItem("admin_authenticated", "true");
  return { success: true };
}
