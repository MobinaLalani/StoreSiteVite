import { API_BASE_URL } from "@/src/lib/api";
import { authFetch } from "@/src/lib/auth";
import type { SiteSettings } from "../types";
async function parse<T>(response:Response){const body=await response.json();if(!response.ok)throw new Error(body.message||"خطا در دریافت تنظیمات");return body as T;}
export const settingsService={
  getPublic:()=>fetch(`${API_BASE_URL}/settings/public`).then(parse<SiteSettings>),
  getAdmin:()=>authFetch(`${API_BASE_URL}/admin/settings`).then(parse<SiteSettings>),
  update:(data:SiteSettings)=>authFetch(`${API_BASE_URL}/admin/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).then(parse<SiteSettings>),
  changePassword:(data:{currentPassword:string;newPassword:string})=>authFetch(`${API_BASE_URL}/auth/password`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).then(parse<{success:boolean;message:string}>),
  logoutAll:()=>authFetch(`${API_BASE_URL}/auth/logout-all`,{method:"POST"}).then(parse<{success:boolean}>),
  activity:()=>authFetch(`${API_BASE_URL}/admin/security/activity`).then(parse<Array<{username:string;success:boolean;ip:string;createdAt:string}>>),
};
