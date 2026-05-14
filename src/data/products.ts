export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "t-shirts" | "shirts" | "jeans" | "jackets" | "ethnic" | "accessories";
  price: number;
  originalPrice?: number;
  sizes: string[];
  colors: string[];
  images: string[];
  badge?: "NEW" | "HOT" | "SALE";
  description: string;
  material: string;
  fit: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
};

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "tshirt-001", slug: "urban-camo-oversized-tee", name: "Urban Camo Oversized Tee",
    category: "t-shirts", price: 799, originalPrice: 1199,
    sizes: ["S","M","L","XL","XXL"], colors: ["Black","Navy","Olive"],
    images: [u("photo-1503341504253-dff4815485f1"), u("photo-1583743814966-8936f5b7be1a"), u("photo-1576566588028-4147f3842f27")],
    badge: "NEW",
    description: "Heavyweight oversized tee built for the streets. Garment-washed for that lived-in feel from day one.",
    material: "100% Combed Cotton, 240 GSM", fit: "Oversized",
    isNewArrival: true, inStock: true,
  },
  {
    id: "tshirt-002", slug: "axuro-graphic-tee", name: "AXURO Graphic Tee",
    category: "t-shirts", price: 699, originalPrice: 999,
    sizes: ["S","M","L","XL"], colors: ["White","Black"],
    images: [u("photo-1521572163474-6864f9cf17ab"), u("photo-1618354691373-d851c5c3a990")],
    badge: "HOT",
    description: "Signature AXURO chest print on premium cotton. The everyday hero of your rotation.",
    material: "100% Cotton, 200 GSM", fit: "Regular",
    isBestSeller: true, inStock: true,
  },
  {
    id: "tshirt-003", slug: "boxy-stripe-tee", name: "Boxy Stripe Tee",
    category: "t-shirts", price: 749,
    sizes: ["S","M","L","XL"], colors: ["Cream","Black"],
    images: [u("photo-1622445275576-721325763afe"), u("photo-1583744946564-b52ac1c389c8")],
    badge: "NEW",
    description: "Retro stripes meet a modern boxy cut. A clean go-to for layering or solo runs.",
    material: "Cotton Blend", fit: "Boxy",
    isNewArrival: true, inStock: true,
  },
  {
    id: "tshirt-004", slug: "minimal-pocket-tee", name: "Minimal Pocket Tee",
    category: "t-shirts", price: 599,
    sizes: ["S","M","L","XL","XXL"], colors: ["Sand","Black","White"],
    images: [u("photo-1583744946564-b52ac1c389c8"), u("photo-1503341504253-dff4815485f1")],
    description: "Clean pocket detail, premium feel. Wear it with everything.",
    material: "100% Cotton", fit: "Regular",
    isBestSeller: true, inStock: true,
  },
  {
    id: "tshirt-005",
    slug: "heavyweight-oversized-tee-black",
    name: "Heavyweight Oversized Tee — Black",
    category: "t-shirts",
    price: 899,
    originalPrice: 1299,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    images: ["/images/products/sample-oversized-tee-black.jpg"],
    badge: "NEW",
    description: "Heavyweight oversized tee built for the streets. Garment-washed cotton that gets better with every wear — drop-shoulder cut, boxy fit, all attitude.",
    material: "100% Combed Cotton, 240 GSM",
    fit: "Oversized",
    isNewArrival: true,
    inStock: true,
  },

  {
    id: "shirt-001", slug: "linen-overshirt-stone", name: "Linen Overshirt — Stone",
    category: "shirts", price: 1599, originalPrice: 2199,
    sizes: ["M","L","XL"], colors: ["Stone","Black"],
    images: [u("photo-1602810318383-e386cc2a3ccf"), u("photo-1591047139829-d91aecb6caea")],
    badge: "NEW",
    description: "Breathable linen-blend overshirt. Throw it over a tee for instant elevation.",
    material: "55% Linen / 45% Cotton", fit: "Relaxed",
    isNewArrival: true, inStock: true,
  },
  {
    id: "shirt-002", slug: "noir-cuban-shirt", name: "Noir Cuban Collar Shirt",
    category: "shirts", price: 1299,
    sizes: ["S","M","L","XL"], colors: ["Black"],
    images: [u("photo-1596755094514-f87e34085b2c"), u("photo-1602810316693-3667c854239a")],
    badge: "HOT",
    description: "Cuban collar, soft drape, all attitude. Built for warm Indian nights.",
    material: "Viscose Blend", fit: "Relaxed",
    isBestSeller: true, inStock: true,
  },
  {
    id: "shirt-003", slug: "checked-flannel", name: "Checked Flannel",
    category: "shirts", price: 1499,
    sizes: ["M","L","XL","XXL"], colors: ["Red","Olive"],
    images: [u("photo-1608256246200-53e635b5b65f"), u("photo-1602293589930-45aad59ba3ab")],
    description: "Brushed flannel with a heritage check. Layer it open or button it up.",
    material: "100% Cotton Flannel", fit: "Regular",
    inStock: true,
  },
  {
    id: "shirt-004", slug: "white-oxford", name: "Crisp White Oxford",
    category: "shirts", price: 1199,
    sizes: ["S","M","L","XL"], colors: ["White"],
    images: [u("photo-1620012253295-c15cc3e65df4"), u("photo-1598033129183-c4f50c736f10")],
    description: "The white oxford, perfected. Office-to-street ready.",
    material: "100% Oxford Cotton", fit: "Slim",
    inStock: true,
  },

  {
    id: "jeans-001", slug: "straight-fit-indigo", name: "Straight Fit Indigo Jeans",
    category: "jeans", price: 1799, originalPrice: 2499,
    sizes: ["28","30","32","34","36"], colors: ["Indigo"],
    images: [u("photo-1542272604-787c3835535d"), u("photo-1604176354204-9268737828e4")],
    badge: "HOT",
    description: "Mid-rise straight fit in deep indigo. Honest denim, all day comfort.",
    material: "98% Cotton / 2% Elastane, 12oz", fit: "Straight",
    isBestSeller: true, inStock: true,
  },
  {
    id: "jeans-002", slug: "loose-baggy-black", name: "Loose Baggy Jeans — Black",
    category: "jeans", price: 1899,
    sizes: ["30","32","34","36"], colors: ["Black"],
    images: [u("photo-1582552938357-32b906df40cb"), u("photo-1604176354204-9268737828e4")],
    badge: "NEW",
    description: "Skater-inspired loose baggy fit. Streetwear must-have.",
    material: "100% Cotton, 14oz", fit: "Baggy",
    isNewArrival: true, inStock: true,
  },
  {
    id: "jeans-003", slug: "distressed-slim", name: "Distressed Slim Jeans",
    category: "jeans", price: 1699,
    sizes: ["28","30","32","34"], colors: ["Faded Blue"],
    images: [u("photo-1541099649105-f69ad21f3246"), u("photo-1542272604-787c3835535d")],
    description: "Lived-in distressing, slim through the leg. Edge with comfort.",
    material: "Cotton Blend", fit: "Slim",
    inStock: true,
  },
  {
    id: "jeans-004", slug: "cargo-utility-pant", name: "Cargo Utility Pant",
    category: "jeans", price: 1599,
    sizes: ["30","32","34","36"], colors: ["Khaki","Black"],
    images: [u("photo-1517438476312-10d79c077509"), u("photo-1473966968600-fa801b869a1a")],
    badge: "NEW",
    description: "Functional cargo pockets, technical streetwear silhouette.",
    material: "Cotton Twill", fit: "Relaxed",
    isNewArrival: true, inStock: true,
  },

  {
    id: "jacket-001", slug: "varsity-bomber", name: "Varsity Bomber Jacket",
    category: "jackets", price: 2999, originalPrice: 3999,
    sizes: ["M","L","XL"], colors: ["Black/Cream"],
    images: [u("photo-1591047139829-d91aecb6caea"), u("photo-1551028719-00167b16eac5")],
    badge: "HOT",
    description: "Heavyweight varsity bomber with chenille patches. Statement outerwear.",
    material: "Wool Blend Body, Leather Sleeves", fit: "Regular",
    isBestSeller: true, inStock: true,
  },
  {
    id: "jacket-002", slug: "denim-trucker", name: "Classic Denim Trucker",
    category: "jackets", price: 2299,
    sizes: ["S","M","L","XL"], colors: ["Mid Blue"],
    images: [u("photo-1551488831-00ddcb6c6bd3"), u("photo-1542272604-787c3835535d")],
    description: "The trucker jacket, reimagined. Rigid denim that breaks in beautifully.",
    material: "100% Cotton Denim", fit: "Regular",
    inStock: true,
  },
  {
    id: "jacket-003", slug: "puffer-vest-navy", name: "Puffer Vest — Navy",
    category: "jackets", price: 2499,
    sizes: ["M","L","XL"], colors: ["Navy","Black"],
    images: [u("photo-1539533018447-63fcce2678e3"), u("photo-1591047139829-d91aecb6caea")],
    badge: "NEW",
    description: "Lightweight puffer vest for layered looks across Indian winters.",
    material: "Recycled Nylon Shell", fit: "Regular",
    isNewArrival: true, inStock: true,
  },
  {
    id: "jacket-004", slug: "tech-windbreaker", name: "Tech Windbreaker",
    category: "jackets", price: 1999,
    sizes: ["S","M","L","XL"], colors: ["Black","Olive"],
    images: [u("photo-1606925797300-0b35e9d1794e"), u("photo-1551028719-00167b16eac5")],
    description: "Water-resistant tech shell with bold paneling. Built for the urban grind.",
    material: "Recycled Polyester", fit: "Relaxed",
    inStock: true,
  },

  {
    id: "ethnic-001", slug: "linen-kurta-ivory", name: "Linen Kurta — Ivory",
    category: "ethnic", price: 1499,
    sizes: ["S","M","L","XL","XXL"], colors: ["Ivory","Black"],
    images: [u("photo-1622445275576-721325763afe"), u("photo-1602810318383-e386cc2a3ccf")],
    badge: "NEW",
    description: "Modern minimal kurta in pure linen. Festive, refined, breathable.",
    material: "100% Linen", fit: "Regular",
    isNewArrival: true, inStock: true,
  },
  {
    id: "ethnic-002", slug: "bandhgala-jacket", name: "Bandhgala Nehru Jacket",
    category: "ethnic", price: 2499, originalPrice: 3299,
    sizes: ["M","L","XL"], colors: ["Black","Maroon"],
    images: [u("photo-1622445275576-721325763afe"), u("photo-1591047139829-d91aecb6caea")],
    description: "Tailored bandhgala for occasions. Pairs with kurta or shirt.",
    material: "Poly-Wool Blend", fit: "Tailored",
    inStock: true,
  },

  {
    id: "acc-001", slug: "trucker-cap-black", name: "Trucker Cap — Black",
    category: "accessories", price: 499,
    sizes: ["One Size"], colors: ["Black","Navy","White"],
    images: [u("photo-1588850561407-ed78c282e89b"), u("photo-1521369909029-2afed882baee")],
    badge: "HOT",
    description: "Classic 6-panel trucker with curved brim. Embroidered AXURO logo.",
    material: "Cotton / Mesh", fit: "Adjustable",
    isBestSeller: true, inStock: true,
  },
  {
    id: "acc-002", slug: "canvas-tote-bag", name: "Canvas Tote Bag",
    category: "accessories", price: 599,
    sizes: ["One Size"], colors: ["Natural"],
    images: [u("photo-1591561954557-26941169b49e"), u("photo-1544816155-12df9643f363")],
    description: "Heavy 14oz canvas tote with bold AXURO print.",
    material: "Heavy Canvas", fit: "Standard",
    inStock: true,
  },
  {
    id: "acc-003", slug: "leather-belt-tan", name: "Leather Belt — Tan",
    category: "accessories", price: 899,
    sizes: ["32","34","36","38"], colors: ["Tan","Black"],
    images: [u("photo-1624222247344-550fb60583dc"), u("photo-1553062407-98eeb64c6a62")],
    description: "Full-grain leather belt with brushed metal buckle.",
    material: "Full-Grain Leather", fit: "Standard",
    inStock: true,
  },
  {
    id: "acc-004", slug: "beanie-charcoal", name: "Ribbed Beanie — Charcoal",
    category: "accessories", price: 449,
    sizes: ["One Size"], colors: ["Charcoal","Black","Cream"],
    images: [u("photo-1576871337622-98d48d1cf531"), u("photo-1521369909029-2afed882baee")],
    badge: "NEW",
    description: "Soft ribbed beanie for cooler evenings. Folded cuff finish.",
    material: "Acrylic Knit", fit: "Stretch",
    isNewArrival: true, inStock: true,
  },
];

export const categories = [
  { slug: "t-shirts", name: "T-Shirts", image: "photo-1521572163474-6864f9cf17ab" },
  { slug: "shirts", name: "Shirts", image: "photo-1602810318383-e386cc2a3ccf" },
  { slug: "jeans", name: "Jeans", image: "photo-1542272604-787c3835535d" },
  { slug: "jackets", name: "Jackets", image: "photo-1551028719-00167b16eac5" },
  { slug: "ethnic", name: "Ethnic", image: "photo-1622445275576-721325763afe" },
  { slug: "accessories", name: "Accessories", image: "photo-1588850561407-ed78c282e89b" },
].map((c) => ({ ...c, image: `https://images.unsplash.com/${c.image}?auto=format&fit=crop&w=800&q=80` }));

export const categoryDescriptions: Record<string, string> = {
  "t-shirts": "Heavyweight tees, oversized cuts and signature graphics. The foundation of every AXURO fit.",
  "shirts": "From linen overshirts to crisp oxfords — shirts that work day, night and everything in between.",
  "jeans": "Honest denim in straight, slim and baggy fits. Built to break in, designed to last.",
  "jackets": "Statement outerwear for Indian streets — bombers, truckers, vests and tech shells.",
  "ethnic": "Modern Indian wear. Minimal kurtas and tailored bandhgalas for every occasion.",
  "accessories": "Caps, belts, bags and beanies — the details that finish the look.",
};

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getByCategory = (cat: string) => products.filter((p) => p.category === cat);
