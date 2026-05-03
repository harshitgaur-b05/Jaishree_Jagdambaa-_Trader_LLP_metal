const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';

/**
 * Generates a wa.me click-to-chat link with encoded message
 */
export function getWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}

/**
 * Single product WhatsApp enquiry link
 */
export function getSingleProductWALink(product) {
  const message = `Hi, I'm interested in ${product.name} (${product.dimension}). Please share price and availability.`;
  return getWhatsAppLink(message);
}

/**
 * Bundled enquiry cart WhatsApp link
 */
export function getCartWALink(cartItems) {
  const lines = cartItems
    .map((item, i) => `${i + 1}. ${item.name} - ${item.dimension}`)
    .join('\n');
  const message = `Hi, I'd like a quote for the following products:\n${lines}\nPlease share best prices. Thank you.`;
  return getWhatsAppLink(message);
}

/**
 * Bundled enquiry cart with customer details WhatsApp link
 */
export function getCartWithDetailsWALink(cartItems, { name, email, phone }) {
  const lines = cartItems
    .map((item, i) => `${i + 1}. ${item.name} - ${item.dimension}`)
    .join('\n');
  const message = `*NEW PRODUCT ENQUIRY*
----------------------------
*Name/Company:* ${name}
*Phone:* ${phone}
*Email:* ${email || 'N/A'}
----------------------------
*Products Requested:*
${lines}

Please share best prices and availability. Thank you.`;
  return getWhatsAppLink(message);
}

/**
 * Contact form WhatsApp link
 */
export function getContactFormWALink({ name, phone, message }) {
  const text = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`;
  return getWhatsAppLink(text);
}
