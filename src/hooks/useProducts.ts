import { useQuery } from "@tanstack/react-query";
import { fetchProductsFromSheet } from "@/lib/sheet";
import { products as fallbackProducts, type Product } from "@/data/products";

const SHEET_URL = (import.meta.env.VITE_SHEET_URL ||
  import.meta.env.VITE_GOOGLE_SHEET_URL) as string | undefined;

async function loadProducts(): Promise<Product[]> {
  if (!SHEET_URL) {
    // No sheet configured — fall back to bundled demo data so the site still works.
    return fallbackProducts;
  }
  try {
    const fromSheet = await fetchProductsFromSheet(SHEET_URL);
    return fromSheet.length > 0 ? fromSheet : fallbackProducts;
  } catch (err) {
    console.error("[useProducts] Failed to load Google Sheet, using fallback:", err);
    throw err;
  }
}

/**
 * Loads the full product catalogue from Google Sheets (CSV export).
 * Cached in memory for the lifetime of the page — set VITE_GOOGLE_SHEET_URL in `.env`.
 */
export function useProducts() {
  const query = useQuery({
    queryKey: ["products", SHEET_URL ?? "fallback"],
    queryFn: loadProducts,
    staleTime: 5 * 60 * 1000, // 5 min — sheet edits show up on next reload after this
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    products: query.data ?? [],
    loading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

export function useProduct(slug: string) {
  const { products, loading, error } = useProducts();
  const product = products.find((p) => p.slug === slug || p.id === slug);
  return { product, loading, error };
}

export function useProductsByCategory(category: string) {
  const { products, loading, error } = useProducts();
  return { products: products.filter((p) => p.category === category), loading, error };
}
