"use client";

import InquiryAction from "../components/ProductCard/ProductActions";

export default function ProductActions({ productTitle }: { productTitle?: string }) {
  return <InquiryAction productTitle={productTitle} variant="detail" />;
}
