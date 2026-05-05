'use client';

import { useEnquiryCart } from '@/components/EnquiryCart';

export default function AddToCartButton({ product }) {
  const { addToCart, isInCart } = useEnquiryCart();
  const inCart = isInCart(product.id);

  return (
    <button
      onClick={() => addToCart(product)}
      disabled={inCart}
      className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-colors duration-150 border ${
        inCart
          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 cursor-default'
          : 'bg-[#0f172a] hover:bg-[#1e3a5f] text-white border-transparent'
      }`}
    >
      {inCart ? '✓ Added to Enquiry Cart' : '+ Add to Enquiry Cart'}
    </button>
  );
}
