/*
 * ─── LOTUS VOGUE: MARKETING STRATEGY GUIDE ───
 * Channels: Facebook, TikTok, Instagram, Pinterest
 * Budget: $0-$500/month (scalable)
 * Platform: lotusvogue.com (Next.js + Vercel)
 */

export const marketingStrategy = {
  brand: {
    name: "Lotus Vogue",
    tagline: "Bloom in Style",
    voice: "Serene, elegant, aspirational, empowering",
    visualIdentity: {
      colors: {
        primary: "#E8A0BF (Lotus Pink)",
        secondary: "#C9A84C (Gold)",
        neutral: "#FAF7F2 (Warm White)",
        dark: "#2D2D2D (Charcoal)",
      },
      aesthetic: "Soft, romantic, minimalist with luxury accents",
      imageStyle: "Natural lighting, soft focus, warm tones, lifestyle candids",
    },
  },

  // ─── PLATFORM STRATEGIES ───
  platforms: {
    instagram: {
      label: "Instagram (@lotusvogue)",
      primaryGoal: "Brand awareness & visual storytelling",
      postingFrequency: "5-7x per week",
      bestTimes: "7-9 AM, 11 AM-1 PM, 7-9 PM EST",

      contentMix: {
        reels: "40% — Outfit styling, try-on hauls, behind-the-scenes, trending audios",
        photos: "30% — Product shots, flat lays, lifestyle imagery",
        stories: "20% — Polls, Q&As, behind-the-scenes, countdowns to launches",
        carousels: "10% — Style guides, size guides, collection lookbooks",
      },

      contentCalendar: [
        "Monday: Style inspiration reel (outfit of the day)",
        "Tuesday: Product spotlight carousel (detail shots)",
        "Wednesday: Educational carousel (styling tips, fabric care)",
        "Thursday: User-generated content repost + thank you",
        "Friday: New arrival reel (cinematic unboxing/ reveal)",
        "Saturday: Behind-the-scenes (design process, photoshoot)",
        "Sunday: Lifestyle aesthetic (mood board, inspiration)",
      ],

      hashtagStrategy: [
        "#LotusVogue",
        "#BloomInStyle",
        "#MindfulElegance",
        "#SlowFashion",
        "#SustainableStyle",
        "#WomensFashion",
        "#OOTD",
        "#FashionInspo",
        "#EthicalFashion",
        "#SpringStyle2026",
        "#LotusFashion",
        "#ModernElegance",
      ],

      growthTactics: [
        "Collaborate with micro-influencers (5-50K followers, 2-5% engagement)",
        "User-generated content campaigns: #MyLotusMoment",
        "Reels using trending sounds + fashion niche audios",
        "Engage with fashion community posts (10 comments/hr during peak)",
        "Story takeovers with influencers/stylists monthly",
      ],

      estimatedMonthlyReach: "10K-100K (organic, within 3-6 months)",
    },

    tiktok: {
      label: "TikTok (@lotusvogue)",
      primaryGoal: "Viral reach & trend-driven discovery",
      postingFrequency: "3-5x per day",
      bestTimes: "6-9 AM, 12-2 PM, 7-10 PM EST",
      optimalLength: "15-30 seconds (hook in first 2-3 seconds)",

      contentIdeas: [
        "Outfit transformation videos (before/after styling)",
        "\"Get Ready With Me\" featuring Lotus Vogue pieces",
        "Stitching/dueting fashion influencers wearing similar styles",
        "Speed styling (5 outfits from 3 pieces)",
        "Behind the design: sketch to final product",
        "Haul videos with honest reviews",
        "Size inclusivity try-on hauls",
        "\"POV: You found the perfect [dress/top/bag]\"",
        "Style vs. price point — showing quality at affordable prices",
        "Warehouse/shipping BTS — building trust",
      ],

      hashtagStrategy: [
        "#lotusvogue",
        "#fashiontiktok",
        "#styleinspo",
        "#outfitideas",
        "#slowfashion",
        "#ethicalfashion",
        "#clothinghauls",
        "#fypfashion",
        "#springfashion",
        "#womenstyle",
        "#tryonhaul",
        "#fashionreview",
      ],

      growthTactics: [
        "Post 3-5x daily during peak hours",
        "Use trending sounds within 24 hours of trending",
        "Engage with comments within first hour (boosts algorithm)",
        "Duet/stitch with fashion creators (10+ per week)",
        "Run TikTok Shop integration (in-app purchasing)",
        "Create branded effect/filter once reaching 100K followers",
      ],

      estimatedMonthlyReach: "50K-500K (organic, within 3-6 months)",
    },

    pinterest: {
      label: "Pinterest (pinterest.com/lotusvogue)",
      primaryGoal: "Evergreen traffic & SEO-driven discovery",
      postingFrequency: "10-20 pins/day (using Tailwind scheduler)",
      bestTimes: "8-10 PM EST, weekends 9-11 AM EST",
      optimalFormat: "Vertical pins (2:3 ratio, 1000x1500px)",

      boardStrategy: [
        "Spring/Summer 2026 Collection",
        "Lotus Vogue Lookbook",
        "Wardrobe Essentials",
        "Style Inspo: Dresses",
        "Style Inspo: Tops & Blouses",
        "Style Inspo: Bottoms",
        "Style Inspo: Accessories",
        "Sustainable Fashion Tips",
        "Capsule Wardrobe Ideas",
        "Fashion Color Palettes",
        "Office Style",
        "Weekend Wear",
        "Date Night Outfits",
        "Gift Guides (quarterly)",
      ],

      contentTypes: [
        "Lookbook pins (multiple products styled together)",
        "Individual product pins with prices",
        "Style guides (\"How to Style a Midi Dress\")",
        "Infographics (size guide, fabric care)",
        "Collection roundups (\"Top 10 Summer Dresses\")",
        "Video pins (quick styling clips)",
      ],

      seoStrategy: {
        keywords: [
          "spring dresses 2026",
          "sustainable fashion brands",
          "elegant women's clothing",
          "pink aesthetic outfits",
          "ethical clothing brands",
          "minimalist fashion women",
          "affordable luxury fashion",
          "workwear outfits women",
          "summer wardrobe essentials",
          "gift for her fashion",
        ],
        pinTitles: "Include keywords + brand name + year",
        pinDescriptions: "3-5 sentences with 2-3 keywords + link + CTA",
      },

      growthTactics: [
        "Join group boards in fashion niche",
        "Create 5-10 fresh pins per existing blog/shop page",
        "Use Tailwind scheduler for consistent daily posting",
        "Add Pinterest save buttons to all product pages",
        "Collaborate with Pinterest fashion creators for joint boards",
        "Pin user-generated content with credit",
      ],

      estimatedMonthlyReach: "50K-500K (organic impressions, evergreen)",
    },

    facebook: {
      label: "Facebook (/lotusvogue)",
      primaryGoal: "Community building & retargeting",
      postingFrequency: "3-5x per week",
      bestTimes: "9-11 AM, 1-3 PM EST weekdays",

      contentMix: {
        posts: "40% — Product highlights, lifestyle photos",
        stories: "25% — Behind-the-scenes, quick updates",
        videos: "20% — Collection previews, styling tips",
        live: "15% — Q&A sessions, launch events",
      },

      contentIdeas: [
        "Product photo dumps with styling tips",
        "Customer reviews and testimonials",
        "Facebook Live: new collection previews",
        "Polls: \"Which color should we restock?\"",
        "Order/shipping updates",
        "Behind-the-scenes: photoshoot bloopers",
        "Fashion tips and seasonal guides",
        "Exclusive Facebook-only discount codes",
        "Community highlights (customer photos)",
        "Event promotions (pop-ups, sales)",
      ],

      advertisingStrategy: [
        {
          campaign: "Traffic (Retargeting)",
          budget: "$5-10/day",
          audience: "Website visitors, cart abandoners (last 14 days)",
          creative: "Show best-selling products + social proof",
        },
        {
          campaign: "Conversion (New Customers)",
          budget: "$10-20/day",
          audience: "Women 22-45, interests: fashion, Zara, Revolve, Anthropologie",
          creative: "Lifestyle images with clear CTA, limited-time offers",
        },
        {
          campaign: "Lookalike",
          budget: "$10-15/day",
          audience: "Lookalike of purchasers (1-3%)",
          creative: "Test multiple ad formats: single image, carousel, video",
        },
      ],

      estimatedMonthlyReach: "5K-50K organic + paid scalable",
    },
  },

  // ─── CONTENT PRODUCTION ───
  contentProduction: {
    tools: [
      { tool: "Canva", cost: "$0 (free tier)", use: "Social graphics, pin designs, stories" },
      { tool: "CapCut", cost: "$0 (free)", use: "TikTok/Reel video editing" },
      { tool: "Unsplash/Pexels", cost: "$0", use: "Stock lifestyle images (supplement)" },
      { tool: "Tailwind", cost: "$0 (1 board free)", use: "Pinterest scheduling" },
      { tool: "Later", cost: "$0 (30 posts free)", use: "Instagram/Facebook scheduling" },
    ],

    weeklyProductionPlan: [
      "Sunday: Plan week's content, shoot batch photos (2 hours)",
      "Monday: Edit and schedule Instagram + Facebook posts (1 hour)",
      "Tuesday: Record and edit TikTok + Reels (2 hours total)",
      "Wednesday: Create Pinterest pins (10-15) (1 hour)",
      "Thursday: Engage with community, respond to comments (30 min)",
      "Friday: Analyze this week's performance, plan next week (1 hour)",
      "Saturday: Off or light engagement only",
    ],

    photoStyle: [
      "Natural lighting, golden hour preferred",
      "Neutral backgrounds (white, cream, beige)",
      "Model wearing product in natural pose",
      "Flat lays with complementary accessories",
      "Consistent filter/preset across all visuals",
    ],
  },

  // ─── BUDGET SCENARIOS ───
  budgetScenarios: [
    {
      tier: "Starter ($0/month)",
      focus: "Organic only across all 4 platforms",
      timeCommitment: "5-7 hours/week",
      expectedGrowth: "500-2K followers per month across platforms",
    },
    {
      tier: "Growth ($200/month)",
      focus: "Facebook Ads ($100) + Influencer Gifting ($100)",
      timeCommitment: "10-12 hours/week",
      expectedGrowth: "1K-5K followers per month, 5-20 orders/month from ads",
    },
    {
      tier: "Accelerated ($500/month)",
      focus: "Facebook/IG Ads ($300) + Influencer Program ($150) + TikTok Promote ($50)",
      timeCommitment: "15-20 hours/week",
      expectedGrowth: "3K-10K followers per month, 15-50 orders/month from ads",
    },
  ],

  // ─── KEY PERFORMANCE INDICATORS (MONTHLY) ───
  kpis: {
    awareness: [
      "Instagram: 10K+ reach, 500+ new followers",
      "TikTok: 50K+ views, 500+ new followers",
      "Pinterest: 50K+ impressions, 100+ saves",
      "Facebook: 5K+ reach, 50+ new page likes",
    ],
    engagement: [
      "Instagram: 3%+ engagement rate (likes + comments / followers)",
      "TikTok: 5%+ engagement rate",
      "Pinterest: 0.5%+ click-through rate",
      "Facebook: 1%+ engagement rate",
    ],
    conversion: [
      "Website click-through rate: 2%+",
      "Add to cart rate: 5%+",
      "Checkout completion rate: 60%+",
      "Return on ad spend: 2x+ (once ads start)",
    ],
  },

  // ─── QUICK START CHECKLIST (FIRST 30 DAYS) ───
  quickStart: [
    "□ Week 1: Create & optimize all social media profiles (consistent handle: @lotusvogue)",
    "□ Week 1: Take 50+ product photos (model + flat lay + detail shots)",
    "□ Week 1: Write 20+ Pinterest-optimized product descriptions",
    "□ Week 2: Post first 10 Pinterest pins",
    "□ Week 2: Launch Instagram with 5 foundation posts",
    "□ Week 2: Create TikTok account and post 3 videos",
    "□ Week 2: Set up Facebook Page + Shop section",
    "□ Week 3: Begin daily posting schedule",
    "□ Week 3: Reach out to 10 micro-influencers for collaborations",
    "□ Week 3: Install analytics tracking (Meta Pixel, TikTok Pixel)",
    "□ Week 4: Review first month analytics, refine strategy",
    "□ Week 4: Launch first paid ad campaign ($50-100 test budget)",
  ],

  // ─── MONTHLY CONTENT THEMES ───
  monthlyThemes: [
    { month: "Month 1", theme: "Brand Introduction — 'Meet Lotus Vogue'", focus: "Brand story, values, hero products" },
    { month: "Month 2", theme: "Style Discovery — 'Find Your Look'", focus: "Styling guides, outfit ideas, category deep dives" },
    { month: "Month 3", theme: "Community — 'The Lotus Circle'", focus: "UGC campaigns, customer spotlights, reviews" },
    { month: "Month 4", theme: "Seasonal — 'Summer Edit'", focus: "Seasonal must-haves, vacation looks, summer essentials" },
    { month: "Month 5", theme: "Sustainability — 'Mindful Fashion'", focus: "Behind the scenes, ethical practices, care tips" },
    { month: "Month 6", theme: "Mid-Year — 'Best of Lotus'", focus: "Bestsellers, fan favorites, mid-year sale" },
  ],

  // ─── RESOURCES ───
  resources: {
    hasthagResearch: "Use DisplayPurpose.com or Later.com for trending fashion hashtags",
    trendTracking: "Google Trends, TikTok Creative Center, Pinterest Trends",
    analytics: "Meta Business Suite, TikTok Analytics, Pinterest Analytics, Google Analytics 4",
    community: "r/ethicalfashion, r/femalefashionadvice (for insights, not promotion)",
    education: "Meta Blueprint (free ad courses), TikTok For Business Academy",
  },
};
