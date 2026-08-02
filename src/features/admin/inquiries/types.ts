export type InquiryStatus="new"|"contacted"|"quoted"|"completed"|"cancelled";
export interface Inquiry{id:number;name:string;mobile:string;productId?:number;productTitle:string;quantity?:number;description?:string;preferredContact?:"phone"|"whatsapp";status:InquiryStatus;adminNote:string;createdAt:string;updatedAt:string}
export type CreateInquiry=Pick<Inquiry,"name"|"mobile"|"productTitle">&Partial<Pick<Inquiry,"productId"|"quantity"|"description"|"preferredContact">>;
