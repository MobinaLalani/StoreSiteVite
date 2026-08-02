import{useMutation,useQuery,useQueryClient}from"@tanstack/react-query";import{inquiryService}from"../services/inquiry.service";import type{InquiryStatus}from"../types";
export const inquiryKeys={all:["inquiries"]as const};
export function useInquiries(){return useQuery({queryKey:inquiryKeys.all,queryFn:inquiryService.list});}
export function useUpdateInquiry(){const c=useQueryClient();return useMutation({mutationFn:({id,data}:{id:number;data:{status?:InquiryStatus;adminNote?:string}})=>inquiryService.update(id,data),onSuccess(){c.invalidateQueries({queryKey:inquiryKeys.all})}})}
export function useDeleteInquiry(){const c=useQueryClient();return useMutation({mutationFn:inquiryService.remove,onSuccess(){c.invalidateQueries({queryKey:inquiryKeys.all})}})}
