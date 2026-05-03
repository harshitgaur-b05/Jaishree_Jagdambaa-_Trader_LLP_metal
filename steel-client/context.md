# Project Context: Steel Client Website

## Overview
A Next.js 14 (App Router) product catalogue website for a B2B steel products supplier. The site is a static catalogue with no backend or database for V1. All leads are generated via WhatsApp.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (for accessible components)
- Deployment: Vercel

## Design Inspiration (from provided image)
The user provided an image of "XYZ Traders LLP" as the design inspiration. Key takeaways for the visual style:
- **Aesthetic:** Clean, professional, corporate B2B look. Not a typical e-commerce site.
- **Color Palette:** Dark navy/steel blue for headers, footers, and accents. White or light gray backgrounds for main content areas to keep it clean.
- **Hero Section:** Large, high-quality industrial background image with a solid or semi-transparent overlay box containing the main value proposition and a clear CTA button.
- **Typography:** Professional sans-serif (like Inter), with clear hierarchy. Bold headings.
- **Cards:** White cards with subtle shadows for products or certificates. In the inspiration, they use green "Verified" badges and side-by-side buttons (e.g., "View Details", "Download PDF"). We can adapt this for product cards ("Add to Enquiry", "WhatsApp").
- **Layout:** Well-spaced sections, grid layouts for items (like services or products).

## Architecture & Data Flow
- **Data Source:** `/data/products.json` serves as the sole data source.
- **State Management:** URL search parameters are used for filter state (Category, Sub-Category, Type, Dimension) to ensure shareable links. `localStorage` is used for the Enquiry Cart to persist selected items across pages.
- **Contact Mechanism:** All interactions (product inquiry, cart checkout, general contact) resolve to a pre-filled WhatsApp message using `wa.me` links.

## Key Features to Implement
1. **Products JSON:** Populate `products.json` with realistic steel products.
2. **Cascading Filter Bar:** 4 dropdowns (Category -> Sub-Category -> Type -> Dimension) that update URL params and filter products in real-time.
3. **Product Cards:** Display product info, image, price range, and WhatsApp/Enquiry buttons.
4. **Floating Enquiry Cart:** Bottom-right cart that collects products and sends a bundled WhatsApp message.
5. **Static Pages:** Home, Products (listing), Product Detail (SSG via `generateStaticParams`), and Contact.
6. **SEO:** Dynamic metadata and sitemap.

## Next Steps
1. Populate `data/products.json`.
2. Build the `FilterBar` component.
3. Build the `ProductCard` component.
4. Integrate filters and cards into the `/products` page.
