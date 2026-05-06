import productsData from '@/data/products.json'; // Trigger HMR

const EXCLUDED_TERMS = [
  "TURBO FAN", "SCREW", "WATER CUTTER", "LIGHT SHEETS", "FIBER SHEETS", "POLYCARBONATE SHEETS"
];

function isVisible(p) {
  return !EXCLUDED_TERMS.some(term => p.name.includes(term));
}

/**
 * Returns all products
 */
export function getAllProducts() {
  return productsData.filter(isVisible);
}

/**
 * Returns a single product by slug
 */
export function getProductBySlug(slug) {
  // Products from extracted_products.json use _id, not slug
  return productsData.find((p) => (p.slug || p._id) === slug) || null;
}

/**
 * Returns all unique categories
 */
export function getCategories() {
  return [...new Set(productsData.filter(isVisible).map((p) => p.category))].filter(
    c => c !== 'Sheets/Plates' && c !== 'Wires and Cables'
  );
}

/**
 * Returns sub-categories for a given category
 */
export function getSubCategories(category) {
  return [
    ...new Set(
      productsData
        .filter((p) => isVisible(p) && p.category === category)
        .map((p) => p.subCategory)
    ),
  ];
}

/**
 * Returns types for a given category + subCategory
 */
export function getTypes(category, subCategory) {
  if (subCategory === 'TMT') return ['TMT Bars'];
  return [
    ...new Set(
      productsData
        .filter((p) => isVisible(p) && p.category === category && p.subCategory === subCategory)
        .map((p) => p.type)
    ),
  ];
}

/**
 * Returns dimensions for a given category + subCategory + type
 */
export function getDimensions(category, subCategory, type) {
  return [
    ...new Set(
      productsData
        .filter((p) => {
          if (!isVisible(p)) return false;
          if (p.category !== category || p.subCategory !== subCategory) return false;
          if (subCategory === 'TMT' && type === 'TMT Bars') return true;
          return p.type === type;
        })
        .map((p) => p.dimension)
    ),
  ];
}

/**
 * Filters products by query params object
 */
export function filterProducts({ category, sub, type, dimension } = {}) {
  return productsData.filter((p) => {
    if (!isVisible(p)) return false;
    if (p.category === 'Sheets/Plates') return false;
    if (category && p.category !== category) return false;
    if (sub && p.subCategory !== sub) return false;
    if (type) {
      if (sub === 'TMT' && type === 'TMT Bars') {
        // match any type for TMT
      } else if (p.type !== type) {
        return false;
      }
    }
    if (dimension && p.dimension !== dimension) return false;
    return true;
  });
}

/**
 * Returns related products (same category, excludes current slug, max 4)
 */
export function getRelatedProducts(slug, category) {
  return productsData
    .filter((p) => (p.slug || p._id) !== slug && p.category === category)
    .slice(0, 4);
}

/**
 * Returns all slugs for generateStaticParams
 */
export function getAllSlugs() {
  // Fall back to _id when no slug field exists
  const slugs = productsData
    .map((p) => {
      const val = p.slug || p._id;
      return val ? { slug: String(val) } : null;
    })
    .filter((p) => p !== null && p.slug.length > 0);
  
  return slugs;
}
