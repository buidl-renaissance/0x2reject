/** WhatsApp chat URL with optional prefilled text. Phone may include + or dashes. */
export function whatsappHref(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
