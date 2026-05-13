import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSlugs, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { getSingleProductWALink } from '@/lib/whatsapp';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from './AddToCartButton';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  console.log('Static Params Count:', slugs.length);
  if (slugs.length > 0) {
    console.log('Sample Slug:', slugs[0]);
  }
  return slugs.map(s => ({
    slug: String(s.slug)
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  const COMPANY = process.env.NEXT_PUBLIC_COMPANY_NAME || 'SteelMart India';
  return {
    title: `${product.name} ${product.dimension}`,
    description: product.description,
    openGraph: {
      title: `${product.name} (${product.dimension}) | ${COMPANY}`,
      description: product.description,
    },
  };
}

import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, product.category);
  const waLink = getSingleProductWALink(product);

  return <ProductDetailClient product={product} related={related} waLink={waLink} />;
}
