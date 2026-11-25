import { redirect } from 'next/navigation';
import { PRODUCTS } from '@/data/products';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function LegacyProductPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/details/${slug}`);
}
