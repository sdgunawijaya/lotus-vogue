export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  itemCount: number;
}

export const categories: Category[] = [
  {
    id: "dresses",
    name: "Dresses",
    slug: "dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    description: "Elegant dresses for every occasion",
    itemCount: 8,
  },
  {
    id: "tops",
    name: "Tops",
    slug: "tops",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    description: "Stylish tops and blouses",
    itemCount: 6,
  },
  {
    id: "bottoms",
    name: "Bottoms",
    slug: "bottoms",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    description: "Pants, skirts & more",
    itemCount: 6,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
    description: "Complete your look",
    itemCount: 5,
  },
];

export const products: Product[] = [
  {
    id: "lotus-floral-midi-dress",
    name: "Lotus Floral Midi Dress",
    slug: "lotus-floral-midi-dress",
    category: "dresses",
    price: 89.00,
    originalPrice: 129.00,
    description: "Embrace timeless elegance with our signature Lotus Floral Midi Dress. Featuring an ethereal floral pattern that captures the essence of blooming lotuses, this dress flows gracefully with every step. Perfect for garden parties, brunch dates, or summer evenings.",
    details: [
      "Flowing A-line silhouette",
      "Hidden side zip closure",
      "Adjustable tie waist",
      "Lined bodice",
      "Mid-calf length",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blush Pink", hex: "#E8A0BF" },
      { name: "Ivory", hex: "#FAF7F2" },
      { name: "Sage", hex: "#B5C9B5" },
    ],
    images: [
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=600",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "vogue-tailored-blazer",
    name: "Vogue Tailored Blazer",
    slug: "vogue-tailored-blazer",
    category: "tops",
    price: 149.00,
    description: "A modern classic reimagined. This tailored blazer features clean lines and a soft structure that flatters every body type. The lotus-inspired gold button detail adds a touch of sophistication to this versatile piece.",
    details: [
      "Single-breasted with gold-toned buttons",
      "Notched lapel",
      "Two front flap pockets",
      "Interior pocket",
      "Partial lining",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "Cream", hex: "#F5F0E8" },
      { name: "Blush", hex: "#E8A0BF" },
    ],
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    ],
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "silk-essence-cami",
    name: "Silk Essence Cami",
    slug: "silk-essence-cami",
    category: "tops",
    price: 59.00,
    description: "Luxuriously soft silk camisole that feels like a second skin. The delicate Lotus Vogue monogram at the hem adds an exclusive touch. Layer it or wear it solo — effortless elegance either way.",
    details: [
      "100% silk charmeuse",
      "Adjustable spaghetti straps",
      "Lotus Vogue monogram detail",
      "Slip-on style",
      "Satin trim",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blush Pink", hex: "#E8A0BF" },
      { name: "Champagne", hex: "#F5E6CC" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Ivory", hex: "#FAF7F2" },
    ],
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
    ],
    isNew: true,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "golden-hour-jumpsuit",
    name: "Golden Hour Jumpsuit",
    slug: "golden-hour-jumpsuit",
    category: "dresses",
    price: 119.00,
    originalPrice: 159.00,
    description: "Radiate confidence in this stunning jumpsuit, designed for those golden hour moments. The wrap-style bodice and wide-leg silhouette create a striking, elongated look. A gold chain belt cinches the waist for definition.",
    details: [
      "Wrap-style bodice with V-neck",
      "Wide-leg silhouette",
      "Gold chain belt included",
      "Side pockets",
      "Back zip closure",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Gold", hex: "#C9A84C" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=600&q=80",
      "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?w=600&q=80",
    ],
    isSale: true,
    rating: 4.7,
    reviewCount: 98,
  },
  {
    id: "petal-palazzo-pants",
    name: "Petal Palazzo Pants",
    slug: "petal-palazzo-pants",
    category: "bottoms",
    price: 79.00,
    description: "Flow into fashion with these wide-leg palazzo pants. The lightweight fabric drapes beautifully, creating movement with every step. The Lotus Vogue signature petal embroidery at the hem adds a unique artisan touch.",
    details: [
      "Wide-leg palazzo silhouette",
      "Elasticized waistband with drawstring",
      "Side pockets",
      "Petal embroidery detail at hem",
      "Lightweight viscose blend",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#FAF7F2" },
      { name: "Blush Pink", hex: "#E8A0BF" },
      { name: "Sage", hex: "#B5C9B5" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80",
    ],
    isNew: true,
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: "lotus-handbag",
    name: "Lotus Embossed Handbag",
    slug: "lotus-embossed-handbag",
    category: "accessories",
    price: 129.00,
    originalPrice: 179.00,
    description: "Carry elegance with our signature embossed handbag. The lotus pattern is pressed into premium vegan leather, creating a subtle textured finish that catches the light beautifully. Gold-toned hardware completes the luxury feel.",
    details: [
      "Premium vegan leather with lotus embossing",
      "Gold-toned chain and leather strap",
      "Magnetic snap closure",
      "Interior zip pocket",
      "Fits phones and daily essentials",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Blush Pink", hex: "#E8A0BF" },
      { name: "Gold", hex: "#C9A84C" },
      { name: "Charcoal", hex: "#2D2D2D" },
    ],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
    isSale: true,
    rating: 4.7,
    reviewCount: 143,
  },
  {
    id: "bamboo-silk-scarf",
    name: "Bamboo Silk Scarf",
    slug: "bamboo-silk-scarf",
    category: "accessories",
    price: 45.00,
    description: "Hand-finished bamboo silk scarf featuring an exclusive Lotus Vogue watercolor print. Light as air and incredibly soft. Wear it as a necktie, headband, or bag accessory — versatility meets luxury.",
    details: [
      "Bamboo silk blend",
      "Hand-rolled edges",
      "Watercolor lotus print",
      "90cm x 90cm",
      "Comes in gift box",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Pink Floral", hex: "#E8A0BF" },
      { name: "Gold Floral", hex: "#C9A84C" },
    ],
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
      "https://images.unsplash.com/photo-1584030373081-f37b235ab4f6?w=600&q=80",
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 82,
  },
  {
    id: "high-rise-skinny-jeans",
    name: "Vogue High-Rise Skinny",
    slug: "vogue-high-rise-skinny",
    category: "bottoms",
    price: 69.00,
    description: "The perfect high-rise skinny jean with just the right amount of stretch. Designed to sculpt, lift, and hold its shape all day. The gold-tone button and signature back pocket stitching set these apart.",
    details: [
      "High-rise waist (10.5\")",
      "Skinny leg silhouette",
      "Stretch denim with shape retention",
      "Gold-tone button closure",
      "Five-pocket styling",
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    colors: [
      { name: "Indigo", hex: "#2B4162" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Light Wash", hex: "#7BA0C4" },
    ],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    ],
    rating: 4.4,
    reviewCount: 211,
  },
  {
    id: "cascade-pleated-skirt",
    name: "Cascade Pleated Skirt",
    slug: "cascade-pleated-skirt",
    category: "bottoms",
    price: 85.00,
    description: "Mesmerizing cascade pleats that move with you like water. This midi skirt is a wardrobe essential for the modern woman. Pair with the Silk Essence Cami for the ultimate Lotus Vogue look.",
    details: [
      "Knife-pleated design",
      "Midi length",
      "Elasticized back waist",
      "Side zip closure",
      "Lined",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blush Pink", hex: "#E8A0BF" },
      { name: "Champagne", hex: "#F5E6CC" },
      { name: "Charcoal", hex: "#2D2D2D" },
    ],
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
      "https://images.unsplash.com/photo-1604681630513-69474a4e253f?w=600&q=80",
    ],
    rating: 4.6,
    reviewCount: 73,
  },
  {
    id: "gold-hoop-earrings",
    name: "Lotus Gold Hoops",
    slug: "lotus-gold-hoops",
    category: "accessories",
    price: 39.00,
    description: "Delicate gold hoop earrings with a lotus flower charm that gently dangles within the hoop. Lightweight enough for everyday wear, elegant enough for evening occasions. Hypoallergenic and nickel-free.",
    details: [
      "Gold-plated stainless steel",
      "Lotus charm detail",
      "Hypoallergenic",
      "Lightweight design",
      "Comes with velvet pouch",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Gold", hex: "#C9A84C" },
      { name: "Rose Gold", hex: "#E8A0BF" },
    ],
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
    ],
    isNew: true,
    rating: 4.9,
    reviewCount: 201,
  },
  {
    id: "cashmere-wrap-cardigan",
    name: "Cashmere Wrap Cardigan",
    slug: "cashmere-wrap-cardigan",
    category: "tops",
    price: 139.00,
    originalPrice: 189.00,
    description: "Wrapped in luxury. Our cashmere blend cardigan is impossibly soft and drapes beautifully. The wrap-front design with a gold lotus pin closure makes it as stylish as it is cozy.",
    details: [
      "Cashmere blend (30% cashmere, 70% merino)",
      "Wrap-front with gold lotus pin",
      "Ribbed cuffs and hem",
      "One size fits most",
      "Hand wash recommended",
    ],
    sizes: ["S/M", "M/L", "L/XL"],
    colors: [
      { name: "Cream", hex: "#F5F0E8" },
      { name: "Blush", hex: "#E8A0BF" },
      { name: "Charcoal", hex: "#2D2D2D" },
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
      "https://images.unsplash.com/photo-1621886292650-520f76c747d6?w=600&q=80",
    ],
    isSale: true,
    rating: 4.7,
    reviewCount: 118,
  },
  {
    id: "mini-crossbody-bag",
    name: "Mini Crossbody Bag",
    slug: "mini-crossbody-bag",
    category: "accessories",
    price: 69.00,
    description: "Compact yet functional, this mini crossbody bag is perfect for days when you only need the essentials. Features a removable lotus charm and an adjustable gold chain strap.",
    details: [
      "Vegan leather construction",
      "Removable lotus charm",
      "Adjustable gold chain strap",
      "Magnetic flap closure",
      "Fits phone, cards, and lipstick",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Blush Pink", hex: "#E8A0BF" },
      { name: "Gold", hex: "#C9A84C" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    ],
    rating: 4.5,
    reviewCount: 94,
  },
  {
    id: "linen-wide-leg-pants",
    name: "Linen Wide-Leg Pants",
    slug: "linen-wide-leg-pants",
    category: "bottoms",
    price: 75.00,
    description: "The ultimate warm-weather essential. These linen wide-leg pants are breathable, effortless, and chic. The drawstring waist ensures a perfect fit, while the lotus embroidery adds that signature LV touch.",
    details: [
      "100% European linen",
      "Elasticized drawstring waist",
      "Wide-leg silhouette",
      "Side pockets",
      "Lotus embroidery on back pocket",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#FAF7F2" },
      { name: "Blush", hex: "#E8A0BF" },
      { name: "Olive", hex: "#7B8D6F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    ],
    rating: 4.3,
    reviewCount: 56,
  },
];

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Chen",
    location: "New York, NY",
    avatar: "SC",
    text: "The Lotus Floral Midi Dress is absolutely stunning. I received so many compliments at my friend's garden party. The fit is perfect and the fabric feels luxurious.",
    rating: 5,
  },
  {
    id: 2,
    name: "Emma Rodriguez",
    location: "Los Angeles, CA",
    avatar: "ER",
    text: "I'm obsessed with the Silk Essence Cami! It's so versatile — I've worn it to work under a blazer and out to dinner with jeans. Quality is incredible for the price.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Patel",
    location: "London, UK",
    avatar: "PP",
    text: "The Lotus Embossed Handbag is my new everyday bag. The quality rivals designer brands at a fraction of the cost. Shipping was fast and the packaging was beautiful.",
    rating: 5,
  },
  {
    id: 4,
    name: "Olivia Thompson",
    location: "Sydney, Australia",
    avatar: "OT",
    text: "Golden Hour Jumpsuit is a showstopper! Wore it to a wedding and felt like a million dollars. The gold chain belt is such a clever detail. Already ordering another color!",
    rating: 5,
  },
];

export const featuredProducts = products.filter((p) => p.isNew);
export const saleProducts = products.filter((p) => p.isSale);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
}
