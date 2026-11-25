import { Product, Category, Review } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'mustard-oil',
    nameBn: 'ঘানিভাঙা সরিষার তেল',
    nameEn: 'Cold Pressed Mustard Oil',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
    descriptionBn: 'সিরাজগঞ্জের বাছাইকৃত মাঘী সরিষা থেকে কাঠের ঘানিতে ভাঙা খাঁটি ঝাঁঝালো তেল',
    tagline: 'শতভাগ কাঠের ঘানিভাঙা'
  },
  {
    id: '2',
    slug: 'ghee',
    nameBn: 'গাওয়া ও বিলোড়ন ঘি',
    nameEn: 'Grass-fed Desi Ghee',
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
    itemCount: 6,
    descriptionBn: 'পাবনার চাটমোহরে দেশি গাভীর খাঁটি দুধের মাখন থেকে তৈরি দানাদার সুবাসিত ঘি',
    tagline: 'মাটির হাঁড়িতে মৃদু আঁচে তৈরি'
  },
  {
    id: '3',
    slug: 'honey',
    nameBn: 'সুন্দরবনের প্রাকৃতিক মধু',
    nameEn: 'Sundarbans Wild Honey',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
    descriptionBn: 'সুন্দরবনের গভীর অরণ্য ও খলিশা ফুলের অপরিশোধিত কাঁচা এনজাইম সমৃদ্ধ মধু',
    tagline: '১০০% কাঁচা ও আনপ্রসেসড'
  },
  {
    id: '4',
    slug: 'gur',
    nameBn: 'যশোরের খেজুরের গুড়',
    nameEn: 'Authentic Date Jaggery',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
    descriptionBn: 'যশোরের ঐতিহ্যবাহী গাছিদের হাতে তৈরি খাঁটি নলেন গুড় ও সুস্বাদু পাটালি',
    tagline: 'শীতের আসল প্রাকৃতিক মিষ্টি'
  },
  {
    id: '5',
    slug: 'rice',
    nameBn: 'সুগন্ধি ও ঢেঁকিছাঁটা চাল',
    nameEn: 'Aromatic & Heritage Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    itemCount: 7,
    descriptionBn: 'দিনাজপুরের চিনিগুঁড়া, কাটারিভোগ ও লাল চালের পুষ্টিকর পুষ্টিগুণ',
    tagline: 'কেমিক্যাল ও পলিশবিহীন'
  },
  {
    id: '6',
    slug: 'spices',
    nameBn: 'পাহাড়ি খাঁটি মসলা',
    nameEn: 'Pure Native Spices',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    itemCount: 9,
    descriptionBn: 'খাগড়াছড়ির জুমের হলুদ, খাঁটি মরিচ গুঁড়া ও ঘানিভাঙা কালোজিরা তেল',
    tagline: 'লেড ও কৃত্রিম রঙ মুক্ত'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'gb-1',
    slug: 'cold-pressed-mustard-oil-1l',
    nameBn: 'কাঠের ঘানিভাঙা সরিষার তেল – ১ লিটার',
    nameEn: 'Traditional Cold Pressed Mustard Oil – 1L',
    category: 'mustard-oil',
    categoryNameBn: 'ঘানিভাঙা সরিষার তেল',
    shortDescBn: 'সিরাজগঞ্জের মাঠ থেকে বাছাই করা মাঘী সরিষা। কাঠের ঘানিতে ধীর গতিতে কোল্ড-প্রেসড করায় প্রাকৃতিক ঝাঁঝ ও ভিটামিন ই পুরোপুরি অক্ষুণ্ণ।',
    fullDescBn: 'আমাদের এই তেল সিরাজগঞ্জের তাড়াশ উপজেলার স্থানীয় কৃষকদের সংগৃহীত সেরা জাতের মাঘী সরিষা থেকে প্রস্তুত করা হয়। আধুনিক স্টিল মেশিনে অতিরিক্ত তাপমাত্রায় তেলের পুষ্টি নষ্ট হয়, তাই আমরা ব্যবহার করি সনাতন কাঠের ঘানি। কোনো প্রকার ভেজাল, সয়াবিন মিশ্রণ বা কৃত্রিম সুগন্ধি ছাড়াই বোতলজাত করা হয়। খাঁটি সরিষার আসল ঝাঁঝ ও স্বাদে আপনার পরিবারের রান্না হবে সুস্বাদু ও নিরাপদ।',
    price: 360,
    originalPrice: 420,
    discountPercent: 14,
    unit: '১ লিটার কাঁচের বোতল',
    inStock: true,
    stockCount: 45,
    rating: 4.9,
    reviewCount: 184,
    featured: true,
    isBestseller: true,
    organicCertified: true,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'সেরা বিক্রয়',
    sourceLocation: 'তাড়াশ, সিরাজগঞ্জ',
    nutritionalHighlights: [
      'সনাতন কাঠের ঘানিতে কোল্ড-প্রেসড',
      'প্রাকৃতিক ঝাঁঝ ও আসল সুবাস',
      'ওমেগা-৩ ও ওমেগা-৬ ফ্যাটি অ্যাসিড সমৃদ্ধ',
      'কোনো কেমিক্যাল বা প্রিজারভেটিভ নেই'
    ]
  },
  {
    id: 'gb-2',
    slug: 'pure-desi-ghee-500g',
    nameBn: 'খাঁটি দানাদার গাওয়া ঘি – ৫০০ গ্রাম',
    nameEn: 'Pabna Traditional Desi Ghee – 500g',
    category: 'ghee',
    categoryNameBn: 'গাওয়া ও বিলোড়ন ঘি',
    shortDescBn: 'মুক্ত চারণভূমির দেশি গাভীর দুধের মাখন থেকে তৈরি। ঐতিহ্যবাহী মাটির হাঁড়িতে জ্বাল দেওয়া স্বর্গীয় সোনালী সুবাস।',
    fullDescBn: ' প্রাকৃতিক ঘাস খাওয়া দেশি গাভীর তাজা দুধ থেকে সনাতনী বিলোড়ন পদ্ধতিতে মাখন সংগ্রহ করা হয়। মাটির হাঁড়িতে ধীর আঁচে জ্বাল দিয়ে তৈরি হয় গ্রামবাংলা খাঁটি গাওয়া ঘি। অতুলনীয় দানাদার টেক্সচার, প্রাকৃতিক সোনালী আভা এবং স্বর্গীয় সুবাসে গরম ভাত, খিচুড়ি কিংবা হালুয়ার স্বাদ বেড়ে যায় বহুগুণ।',
    price: 950,
    originalPrice: 1100,
    discountPercent: 14,
    unit: '৫০০ গ্রাম ',
    inStock: true,
    stockCount: 32,
    rating: 5.0,
    reviewCount: 142,
    featured: true,
    isBestseller: true,
    organicCertified: true,
    image: 'https://static.wixstatic.com/media/06d2aa_b2fe93da32f54827bacf64fca9ae8bb8~mv2.jpg/v1/fill/w_568,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/06d2aa_b2fe93da32f54827bacf64fca9ae8bb8~mv2.jpg',
    gallery: [
      'https://static.wixstatic.com/media/06d2aa_b2fe93da32f54827bacf64fca9ae8bb8~mv2.jpg/v1/fill/w_568,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/06d2aa_b2fe93da32f54827bacf64fca9ae8bb8~mv2.jpg',
      'https://compartir.coop/sites/default/files/2026-04/preparar-ghee.webp'
    ],
    badge: 'প্রিমিয়াম কোয়ালিটি',
    sourceLocation: '-, -',
    nutritionalHighlights: [
      '১০০% দেশি গাভীর দুধের খাঁটি মাখন থেকে তৈরি',
      'প্রাকৃতিক দানাদার টেক্সচার ও অরিজিনাল সুবাস',
      'ডালডা, পামওয়েল বা সুগন্ধিমুক্ত',
      'শিশুর মেধা বিকাশ ও বয়স্কদের হজমে সহায়ক'
    ]
  },
  {
    id: 'gb-gur-1',
    slug: 'jashore-patali-gur-1kg',
    nameBn: 'যশোরের খাঁটি খেজুরের পাটালি গুড় – ১ কেজি',
    nameEn: 'Authentic Jashore Date Palm Patali Gur – 1kg',
    category: 'gur',
    categoryNameBn: 'যশোরের খেজুরের গুড়',
    shortDescBn: 'যশোরের খাজুরার দক্ষ গাছিদের হাতে তৈরি তাজা খেজুরের রসের জমাট পাটালি। চিনি ও হাইড্রোজমুক্ত খাঁটি শীতকালীন স্বাদ।',
    fullDescBn: 'শীতের সকালে গাছ থেকে পাড়া তাজা খেজুরের রস বড় লোহার তাওয়ায় ঘণ্টার পর ঘণ্টা জ্বাল দিয়ে ঐতিহ্যবাহী কাঠের ছাঁচে তৈরি হয় এই খাঁটি পাটালি গুড়। কোনো প্রকার চিনি, চুন বা রাসায়নিক হাইড্রোজ মেশানো হয় না। পিঠা-পুলি, পায়েস কিংবা রুটির সাথে খাঁটি গুড়ের মন মাতানো স্বাদ অতুলনীয়।',
    price: 450,
    originalPrice: 520,
    discountPercent: 13,
    unit: '১ কেজি সুরক্ষিত মাটির প্যাকেট',
    inStock: true,
    stockCount: 50,
    rating: 4.9,
    reviewCount: 96,
    featured: true,
    isBestseller: true,
    organicCertified: true,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'শীতের সেরা অফার',
    sourceLocation: 'খাজুরা, যশোর',
    nutritionalHighlights: [
      'চিনি ও রাসায়নিক সম্পূর্ণমুক্ত',
      'প্রাকৃতিক আয়রন ও খনিজের চমৎকার উৎস',
      'পিঠা ও পায়েসে আসল সুবাস আনে',
      'গাছিদের বাড়ি থেকে সরাসরি সংগ্রহ'
    ]
  },
  {
    id: 'gb-3',
    slug: 'sundarbans-wild-honey-500g',
    nameBn: 'সুন্দরবনের প্রাকৃতিক খলিশা ফুলের মধু – ৫০০ গ্রাম',
    nameEn: 'Sundarbans Wild Khalisha Flower Honey – 500g',
    category: 'honey',
    categoryNameBn: 'সুন্দরবনের প্রাকৃতিক মধু',
    shortDescBn: 'মৌয়ালদের সাথে সুন্দরবনের গভীর অরণ্য থেকে সংগৃহীত কাঁচা, আনপ্রসেসড ও এনজাইম সমৃদ্ধ প্রাকৃতিক মধু।',
    fullDescBn: 'মৌসুমের শুরুতে সুন্দরবনের খলিশা ফুল যখন প্রস্ফুটিত হয়, তখন বুনো মৌমাছির দল প্রাকৃতিক মৌচাক তৈরি করে। সেই চাক থেকে কোনো প্রকার হিট, চিনি বা কৃত্রিম প্রসেসিং ছাড়াই সংগৃহীত হয় এই বিরল মধু। এটি কাঁচা ও সক্রিয় এনজাইমযুক্ত, যা ঠাণ্ডা-কাশি প্রতিরোধে ও শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়াতে অত্যন্ত কার্যকরী।',
    price: 680,
    originalPrice: 780,
    discountPercent: 13,
    unit: '৫০০ গ্রাম প্রিমিয়াম কাঁচের বয়াম',
    inStock: true,
    stockCount: 28,
    rating: 4.8,
    reviewCount: 112,
    featured: true,
    isBestseller: false,
    organicCertified: true,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80'
    ],
    badge: '১০০% বুনো মধু',
    sourceLocation: 'মুন্সীগঞ্জ, সুন্দরবন',
    nutritionalHighlights: [
      'প্রাকৃতিক অ্যান্টিব্যাকটেরিয়াল উপাদান',
      'কাঁচা এনজাইম, পোলেন ও ফ্ল্যাভোনয়েড সমৃদ্ধ',
      'চিনি বা চিনির শিরা শূন্য',
      'কাঁচের জারে সুরক্ষিত বায়ুরোধী সিল'
    ]
  },
  {
    id: 'gb-4',
    slug: 'traditional-mustard-oil-2l',
    nameBn: ' সরিষার তেল (ফ্যামিলি প্যাক) – ২ লিটার',
    nameEn: 'Pure Mustard Oil Family Can – 2L',
    category: 'mustard-oil',
    categoryNameBn: 'ঘানিভাঙা সরিষার তেল',
    shortDescBn: 'পুরো পরিবারের স্বাস্থ্যকর রান্নার জন্য উপযুক্ত ২ লিটার সাশ্রয়ী ক্যান। আসল মাঘী সরিষার প্রাকৃতিক ঝাঁঝ।',
    fullDescBn: 'পরিবারের প্রতিদিনের রান্নাকে স্বাস্থ্যকর রাখতে বিশেষ ২ লিটার ফুডগ্রেড ক্যান। সিরাজগঞ্জের শতভাগ খাঁটি সরিষা থেকে প্রস্তুত। ইলিশ ভাজি, শুঁটকি ভুনা কিংবা যে কোনো ঝাল তরকারিতে এনে দেয় বাংলার ঐতিহ্যবাহী স্বাদ।',
    price: 240,
    originalPrice: 260,
    discountPercent: 15,
    unit: '২ লিটার ফুডগ্রেড ক্যান',
    inStock: true,
    stockCount: 50,
    rating: 4.9,
    reviewCount: 156,
    featured: true,
    isBestseller: true,
    organicCertified: true,
    image: 'https://img.drz.lazcdn.com/static/bd/p/67c4d474025bf49fb566d8fe914bb543.jpg_720x720q80.jpg',
    gallery: [
      'https://img.drz.lazcdn.com/static/bd/p/67c4d474025bf49fb566d8fe914bb543.jpg_720x720q80.jpg'
    ],
    badge: 'ফ্যামিলি সেভার',
    sourceLocation: 'তাড়াশ ও উল্লাপাড়া, সিরাজগঞ্জ',
    nutritionalHighlights: [
      'হৃদযন্ত্রের জন্য উপকারি মনোআনস্যাচুরেটেড ফ্যাট',
      'কোলেস্টেরল শূন্য ও স্বাস্থ্যকর',
      'প্রাকৃতিক ঝাঁঝালো স্বাদ',
      'সাশ্রয়ী ফ্যামিলি প্যাক'
    ]
  },
  {
    id: 'gb-5',
    slug: 'dinajpur-kalijira-rice-2kg',
    nameBn: 'দিনাজপুরের সুগন্ধি কালোজিরা চাল – ২ কেজি',
    nameEn: 'Dinajpur Aromatic Kalijira Rice – 2kg',
    category: 'rice',
    categoryNameBn: 'সুগন্ধি ও ঢেঁকিছাঁটা চাল',
    shortDescBn: 'দিনাজপুরের বীরগঞ্জের উর্বর মাটির সুগন্ধি কালোজিরা চাল। কোনো পলিশিং ছাড়াই রান্নায় অপূর্ব সুবাস ছড়ায়।',
    fullDescBn: 'উত্তরবঙ্গের গর্ব ঐতিহ্যবাহী কালোজিরা ধান থেকে সংগৃহীত। কোনো ক্ষতিকর রাসায়নিক বা প্লাস্টিক মেশিনে অতিরিক্ত ঘষাঘষি ছাড়া চাল প্রস্তুত করা হয়। রান্নার পর ভাত হয় নরম ও ঝরঝরে। মেহমানদারির পোলাও কিংবা উৎসবের পায়েসের জন্য সেরা পছন্দ।',
    price: 340,
    originalPrice: 380,
    discountPercent: 11,
    unit: '২ কেজি ইকো কটন ব্যাগ',
    inStock: true,
    stockCount: 60,
    rating: 4.9,
    reviewCount: 89,
    featured: false,
    isBestseller: false,
    organicCertified: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'সুগন্ধি পোলাও চাল',
    sourceLocation: 'বীরগঞ্জ, দিনাজপুর',
    nutritionalHighlights: [
      'প্রাকৃতিক ভেষজ সুবাস ও ঝরঝরে দানা',
      'ইউরিয়া বা ব্লিচিং পাউডার মুক্ত',
      'সহজে হজমযোগ্য সুস্বাদু চাল',
      'সরাসরি কৃষকের গোলা থেকে'
    ]
  },
  {
    id: 'gb-6',
    slug: 'organic-red-lentil-1kg',
    nameBn: 'কুষ্টিয়ার দেশি ছোট দানার মসুর ডাল – ১ কেজি',
    nameEn: 'Kushtia Unpolished Red Lentils – 1kg',
    category: 'spices',
    categoryNameBn: 'পাহাড়ি খাঁটি মসলা',
    shortDescBn: 'কুষ্টিয়ার খাঁটি দেশি ছোট দানার মসুর ডাল। পলিশবিহীন হওয়ায় দ্রুত সিদ্ধ হয় এবং মুখে লেগে থাকার মতো স্বাদ পাওয়া যায়।',
    fullDescBn: 'বাজারে কৃত্রিম তেল মেখে চকচকে করা ডালের ভিড়ে গ্রামবাংলা নিয়ে এসেছে সম্পূর্ণ অপরিশোধিত লাল মসুর ডাল। দ্রুত নরম হয়ে চমৎকার ঘ্রাণ ও ঘন স্বাদের ডাল রান্না হয়।',
    price: 180,
    originalPrice: 200,
    discountPercent: 10,
    unit: '১ কেজি সুরক্ষিত প্যাক',
    inStock: true,
    stockCount: 75,
    rating: 4.7,
    reviewCount: 64,
    featured: false,
    isBestseller: false,
    organicCertified: true,
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'পলিশবিহীন আসল',
    sourceLocation: 'কুমারখালী, কুষ্টিয়া',
    nutritionalHighlights: [
      'উচ্চ উদ্ভিজ্জ প্রোটিন ও ফাইবার',
      'তেল বা কেমিক্যাল পলিশ ছাড়া',
      'স্বাভাবিক সিদ্ধ ও ঘন ডালের স্বাদ'
    ]
  },
  {
    id: 'gb-7',
    slug: 'pure-turmeric-powder-250g',
    nameBn: 'খাগড়াছড়ির জুম চাষের পাহাড়ি হলুদ গুঁড়া – ২৫০ গ্রাম',
    nameEn: 'Khagrachari Sun-Dried Turmeric – 250g',
    category: 'spices',
    categoryNameBn: 'পাহাড়ি খাঁটি মসলা',
    shortDescBn: 'পাহাড়ের জুম চাষের দেশি কাঁচা হলুদ রোদে শুকিয়ে চূর্ণ করা। গাঢ় প্রাকৃতিক সোনালী রঙ ও উচ্চ কারকিউমিন।',
    fullDescBn: 'পার্বত্য অঞ্চলের পাহাড়ি মাটি ও বৃষ্টির পানিতে প্রাকৃতিকভাবে বেড়ে ওঠা দেশি হলুদ। কোনো কৃত্রিম লেড-ক্রোমেট বা ফুড কালার ছাড়া রোদে শুকিয়ে পরিষ্কার পরিবেশে ভাঙানো হয়। সামান্য ব্যবহারেই রান্নায় আনে গাঢ় সোনালী রূপ।',
    price: 140,
    originalPrice: 160,
    discountPercent: 12,
    unit: '২৫০ গ্রাম জিপলক প্যাক',
    inStock: true,
    stockCount: 80,
    rating: 4.9,
    reviewCount: 78,
    featured: false,
    isBestseller: false,
    organicCertified: true,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'কারকিউমিন ৩.৫%+',
    sourceLocation: 'দীঘিনালা, খাগড়াছড়ি',
    nutritionalHighlights: [
      'লেড বা কৃত্রিম ফুড কালার সম্পূর্ণমুক্ত',
      'রোগ প্রতিরোধক প্রাকৃতিক কারকিউমিন',
      'রোদে শুকানো পাহাড়ি দেশি হলুদ'
    ]
  },
  {
    id: 'gb-8',
    slug: 'black-seed-oil-100ml',
    nameBn: 'কাঠের ঘানিভাঙা খাঁটি কালোজিরা তেল – ১০০ মিলি',
    nameEn: 'Cold Pressed Black Seed Oil – 100ml',
    category: 'spices',
    categoryNameBn: 'পাহাড়ি খাঁটি মসলা',
    shortDescBn: 'নাটোরের বাছাইকৃত কালোজিরা থেকে কাঠের ঘানিতে প্রথম চাপে নিংড়ানো ঘন ভেষজ তেল। রোগ প্রতিরোধ ক্ষমতার মহৌষধ।',
    fullDescBn: 'হাদিস বর্ণিত সর্বরোগের মহৌষধ কালোজিরা থেকে সনাতন কোল্ড-প্রেসড পদ্ধতিতে সংগৃহীত এই তেল। কোনো প্রকার মেশিনের তাপ না লাগায় থাইমোকুইনোন (Thymoquinone) উপাদান সম্পূর্ণ অক্ষুণ্ণ থাকে। প্রতিদিন মধু বা হালকা কুসুম গরম পানির সাথে খেলে মেটাবলিজম ও রোগ প্রতিরোধ ক্ষমতা বহুগুণ বৃদ্ধি পায়।',
    price: 290,
    originalPrice: 340,
    discountPercent: 15,
    unit: '১০০ মিলি ড্রপার গ্লাস বোতল',
    inStock: true,
    stockCount: 40,
    rating: 4.9,
    reviewCount: 92,
    featured: true,
    isBestseller: false,
    organicCertified: true,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'ভেষজ মহৌষধ',
    sourceLocation: 'গুরুদাসপুর, নাটোর',
    nutritionalHighlights: [
      'উচ্চ থাইমোকুইনোন ও অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ',
      'হজমরস সক্রিয় ও রোগ প্রতিরোধে সহায়ক',
      '১০০% খাঁটি কোল্ড-প্রেসড পদ্ধতি'
    ]
  }
];

export const DEMO_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    nameBn: 'মাহমুদুল ইসলাম রফিক',
    locationBn: 'উত্তরা সেক্টর ১১, ঢাকা',
    rating: 5,
    date: '৩ দিন আগে',
    commentBn: 'গ্রামবাংলার কাঠের ঘানিভাঙা সরিষার তেল আসলেই অন্য লেভেলের! বোতল খুললেই মাটির সোঁদা গন্ধ আর আসল সরিষার তীব্র ঝাঁঝ পাওয়া যায়। মাটির হাঁড়ির ঘিটাও গরম ভাতে জাস্ট অমৃত। নিয়মিত অর্ডার করব ইনশাআল্লাহ।',
    verifiedBuyer: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    purchasedProduct: 'কাঠের ঘানিভাঙা সরিষার তেল – ১ লিটার'
  },
  {
    id: 'rev-2',
    nameBn: 'ড. ফারহানা শারমীন',
    locationBn: 'ধানমন্ডি লেকভিউ, ঢাকা',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    commentBn: 'বাচ্চাদের খাবারের ক্ষেত্রে কোনো কম্প্রোমাইজ করি না। গ্রামবাংলার পাবনার গাওয়া ঘি আর সুন্দরবনের কাঁচা মধু ল্যাব-গ্রেড খাঁটি মনে হয়েছে। কাঁচের বোতলে চমৎকার প্যাকেজিং ও ডেলিভারি বয় খুব ভদ্র ছিলেন।',
    verifiedBuyer: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    purchasedProduct: 'পাবনার খাঁটি দানাদার গাওয়া ঘি – ৫০০ গ্রাম'
  },
  {
    id: 'rev-3',
    nameBn: 'তাহমিদ আলিম চৌধুরী',
    locationBn: 'হালিশহর, চট্টগ্রাম',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    commentBn: 'যশোরের খাঁটি খেজুরের পাটালি গুড়টা খেয়ে ছোটবেলার নানীবাড়ির পিঠার কথা মনে পড়ে গেল! বাজারে চিনি মেশানো শক্ত গুড়ের ভিড়ে এমন খাঁটি নরম ও সুবাসিত গুড় পাওয়া ভাগ্যের ব্যাপার। ১০/১০ রেটিং!',
    verifiedBuyer: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    purchasedProduct: 'যশোরের খাঁটি খেজুরের পাটালি গুড় – ১ কেজি'
  },
  {
    id: 'rev-4',
    nameBn: 'ফারজানা ইয়াসমিন ইতি',
    locationBn: 'উপশহর, সিলেট',
    rating: 5,
    date: '৩ সপ্তাহ আগে',
    commentBn: 'কালোজিরা চালের সুবাস চমৎকার আর পাহাড়ি হলুদটা রান্নায় দিলে অপূর্ব সোনালী রঙ ধরে। গ্রামবাংলা টিমকে অনেক ধন্যবাদ এমন সততার সাথে খাঁটি দেশি পণ্য পৌঁছে দেওয়ার জন্য।',
    verifiedBuyer: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    purchasedProduct: 'দিনাজপুরের সুগন্ধি কালোজিরা চাল – ২ কেজি'
  }
];

export const TRUST_FEATURES = [
  {
    titleBn: 'শতভাগ খাঁটি ও পরীক্ষিত',
    titleEn: '100% Lab Tested Purity',
    descBn: 'তৃণমূলের বিশ্বস্ত কৃষক ও কারিগরদের থেকে সরাসরি সংগৃহীত। ভেজাল প্রমাণিত হলে ১০ গুণ মূল্য ফেরত গ্যারান্টি।',
    iconName: 'ShieldCheck'
  },
  {
    titleBn: 'সুরক্ষিত কাঁচের ফুডগ্রেড জার',
    titleEn: 'Hygienic Glass Packaging',
    descBn: 'স্বাদ ও পুষ্টিমান শতভাগ অটুট রাখতে ক্ষতিকর প্লাস্টিক পরিহার করে ফুডগ্রেড কাঁচের জার ও সিল ব্যবহার করি।',
    iconName: 'PackageCheck'
  },
  {
    titleBn: 'সারা দেশে ক্যাশ অন ডেলিভারি',
    titleEn: 'Nationwide Safe Delivery',
    descBn: 'ঢাকার ভেতর ২৪-৪৮ ঘণ্টা এবং বাইরে ২-৩ দিনে পৌঁছে যাবে। পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের সুবিধা।',
    iconName: 'Truck'
  },
  {
    titleBn: 'সরাসরি কৃষককে ন্যায্যমূল্য',
    titleEn: 'Fair Price to Farmers',
    descBn: 'মধ্যস্বত্বভোগী ছাড়া কৃষকের কাছ থেকে সরাসরি খাদ্যশস্য ও মধু কেনায় কৃষকের মুখে হাসি ফোটে ও দামও সাশ্রয়ী হয়।',
    iconName: 'HeartHandshake'
  }
];
