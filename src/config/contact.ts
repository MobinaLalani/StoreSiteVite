export const SALES_CONTACT = {
  landlineDisplay: "021-12345678",
  landlineHref: "tel:+982112345678",
  mobileDisplay: "0912-123-4567",
  mobileHref: "tel:+989121234567",
  whatsappNumber: "989121234567",
};

export function whatsappUrl(productTitle?: string) {
  const message = productTitle
    ? `سلام، برای استعلام قیمت محصول «${productTitle}» پیام می‌دهم.`
    : "سلام، برای استعلام قیمت محصولات پیام می‌دهم.";
  return `https://wa.me/${SALES_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
