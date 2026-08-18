export const JOHN_PHONE = '+14193464592';

/** WhatsApp chat URL with optional prefilled text. Phone may include + or dashes. */
export function whatsappHref(
  text: string,
  phone: string = JOHN_PHONE,
): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
