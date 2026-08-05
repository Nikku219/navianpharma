export type Animal = 'Cow' | 'Buffalo' | 'Goat' | 'Poultry';

export interface Product {
  id: string;
  name: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  ingredients: string[];
  animals: Animal[];
  category: string;
  image: string;
  rating: number;
  reviews: number;
  variants: {
    id: string;
    label: string;
    price: number;
    image: string;
  }[];
  usage: string;
}
export const PURPOSES = [
  {
    title: "Milk Production",
    icon: "🥛"
  },
  {
    title: "Growth Support",
    icon: "📈"
  },
  {
    title: "Digestion Care",
    icon: "🔄"
  },
  {
    title: "Immunity Support",
    icon: "🛡️"
  },
  {
    title: "Mineral Nutrition",
    icon: "💊"
  },
  {
    title: "Deworming Solutions",
    icon: "🐛"
  }
];
export const ANIMALS: {name: Animal;image: string;}[] = [
 {
    name: 'Cattle',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800',
  },
  {
    name: 'Buffalo',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800',
  },
  {
    name: 'Goat',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=800',
  },
  {
    name: 'Sheep',
    image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800',
  },
  {
    name: 'Poultry',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800',
  },
  {
    name: 'Pig',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800',
  },
];


export const CATEGORIES = [
'Milk Production',
'Growth Support',
'Digestion Care',
'Immunity Support',
'Mineral Nutrition',
'Deworming Solutions'];


export const PRODUCTS: Product[] = [
{
  id: 'cailmac-gel',
  name: 'Cailmac Gel®',
  brand: 'NAVIAN PHARMA',
  shortDescription:
  'Advanced ionic calcium gel for immediate milk fever prevention.',
  fullDescription:
  'Cailmac Gel® is a premium, fast-absorbing calcium supplement designed to address acute calcium deficiency in high-yielding dairy animals. Formulated with ionic calcium, it ensures rapid absorption into the bloodstream, preventing milk fever and supporting overall metabolic health during the critical transition period.',
  benefits: [
  'Rapidly restores blood calcium levels',
  'Prevents milk fever and associated complications',
  'Supports smooth calving process',
  'Improves early lactation milk yield'],

  ingredients: [
  'Ionic Calcium',
  'Vitamin D3',
  'Magnesium',
  'Carbohydrate base'],

  animals: ['Cow', 'Buffalo'],
  category: 'Milk Production',
  image:
  'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=800',
  rating: 4.8,
  reviews: 124,
  variants: [
    {
      id: '300g-tube',
      label: '300g Tube',
      price: 549,
      image:
        'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pack-of-4',
      label: 'Pack of 4',
      price: 1999,
      image:
        'https://images.unsplash.com/photo-1580937451032-9dbcfb437bff?auto=format&fit=crop&q=80&w=800'
    }
  ],
  usage:
  'Administer one tube 6-12 hours prior to expected calving, and another tube within 6-12 hours after calving.'
},
{
  id: 'malbo-boost',
  name: 'Malbo-Boost®',
  brand: 'NAVIAN PHARMA',
  shortDescription:
  'High-energy liquid supplement for rapid recovery and growth.',
  fullDescription:
  'Malbo-Boost® provides an instant energy surge for weak or recovering animals. It is enriched with vital gluconeogenic precursors that bypass rumen degradation to provide direct energy, reducing the risk of ketosis and improving overall vitality.',
  benefits: [
  'Instant energy supply',
  'Reduces risk of ketosis',
  'Improves appetite and digestion',
  'Supports rapid growth in young animals'],

  ingredients: [
  'Propylene Glycol',
  'Niacinamide',
  'Vitamin B12',
  'Choline Chloride'],

  animals: ['Cow', 'Buffalo', 'Goat'],
  category: 'Growth Support',
  image:
  'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800',
  rating: 4.9,
  reviews: 89,
  variants: [
    {
      id: '1-liter',
      label: '1 Liter',
      price: 649,
      image:
        'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '5-liter',
      label: '5 Liter',
      price: 2899,
      image:
        'https://images.unsplash.com/photo-1519340333755-83a1b7dfabd0?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '20-liter',
      label: '20 Liter',
      price: 9999,
      image:
        'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&q=80&w=800'
    }
  ],
  usage:
  'Cattle/Buffalo: 200ml daily. Goats: 20-50ml daily. Administer orally.'
},
{
  id: 'malbomin-fort',
  name: 'Malbomin Fort®',
  brand: 'NAVIAN PHARMA',
  shortDescription:
  'Chelated mineral mixture for peak reproductive and productive performance.',
  fullDescription:
  'A scientifically balanced blend of essential macro and micro minerals in chelated form, ensuring maximum bioavailability. Malbomin Fort® addresses hidden mineral deficiencies that impact fertility, immunity, and milk production.',
  benefits: [
  'Improves conception rates',
  'Maintains healthy skin and coat',
  'Strengthens hooves and bones',
  'Boosts immune response'],

  ingredients: [
  'Chelated Zinc',
  'Chelated Copper',
  'Cobalt',
  'Selenium',
  'Calcium',
  'Phosphorus'],

  animals: ['Cow', 'Buffalo', 'Goat', 'Poultry'],
  category: 'Mineral Nutrition',
  image:
  'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800',
  rating: 4.7,
  reviews: 215,
  variants: [
    {
      id: '1-kg',
      label: '1 kg',
      price: 799,
      image:
        'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '5-kg',
      label: '5 kg',
      price: 3499,
      image:
        'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '25-kg-sack',
      label: '25 kg Sack',
      price: 14999,
      image:
        'https://images.unsplash.com/photo-1580910051071-1b6034a21e6e?auto=format&fit=crop&q=80&w=800'
    }
  ],
  usage:
  'Mix 50g per day in feed for adult cattle/buffalo. 10-15g for goats.'
},
{
  id: 'yy-worms',
  name: 'YY Worms®',
  brand: 'NAVIAN PHARMA',
  shortDescription:
  'Broad-spectrum anthelmintic for complete internal parasite control.',
  fullDescription:
  'YY Worms® offers effective control against a wide range of gastrointestinal roundworms, lungworms, and tapeworms. Regular deworming with YY Worms ensures better nutrient absorption and healthier animals.',
  benefits: [
  'Eradicates adult and larval stages of worms',
  'Safe for pregnant animals',
  'Improves feed conversion ratio',
  'Single dose effectiveness'],

  ingredients: ['Albendazole', 'Ivermectin', 'Excipients'],
  animals: ['Cow', 'Buffalo', 'Goat'],
  category: 'Deworming Solutions',
  image:
  'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800',
  rating: 4.6,
  reviews: 156,
  variants: [
    {
      id: '100-ml',
      label: '100 ml',
      price: 249,
      image:
        'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '500-ml',
      label: '500 ml',
      price: 999,
      image:
        'https://images.unsplash.com/photo-1534331840983-5f76caa10942?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '1-liter',
      label: '1 Liter',
      price: 1799,
      image:
        'https://images.unsplash.com/photo-1524594154903-0634dd760c49?auto=format&fit=crop&q=80&w=800'
    }
  ],
  usage:
  'Administer orally at 1ml per 10kg body weight or as directed by veterinarian.'
},
{
  id: 'malbovit-h',
  name: 'Malbovit-H®',
  brand: 'NAVIAN PHARMA',
  shortDescription:
  'Premium Vitamin H (Biotin) supplement for udder health and hoof strength.',
  fullDescription:
  'Malbovit-H® is a specialized liquid supplement rich in Vitamin H, Vitamin E, and Selenium. It is specifically formulated to strengthen udder tissues, prevent mastitis, and improve hoof integrity in high-yielding dairy cows.',
  benefits: [
  'Strengthens udder tissues',
  'Reduces somatic cell count in milk',
  'Improves hoof hardness and reduces lameness',
  'Acts as a powerful antioxidant'],

  ingredients: [
  'Vitamin H (Biotin)',
  'Vitamin E',
  'Selenium',
  'Vitamin A',
  'Vitamin D3'],

  animals: ['Cow', 'Buffalo'],
  category: 'Immunity Support',
  image:
  'https://images.unsplash.com/photo-1535090467336-9501f96e2362?auto=format&fit=crop&q=80&w=800',
  rating: 4.9,
  reviews: 342,
  variants: [
    {
      id: '250-ml',
      label: '250 ml',
      price: 399,
      image:
        'https://images.unsplash.com/photo-1535090467336-9501f96e2362?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '500-ml',
      label: '500 ml',
      price: 699,
      image:
        'https://images.unsplash.com/photo-1504615755583-2916b52192b7?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '1-liter',
      label: '1 Liter',
      price: 1199,
      image:
        'https://images.unsplash.com/photo-1543168257-c7d70b23c9b8?auto=format&fit=crop&q=80&w=800'
    }
  ],
  usage: '10-20ml daily per animal for 15-20 days.'
},
{
  id: 'malboliv',
  name: 'MalboLiv®',
  brand: 'NAVIAN PHARMA',
  shortDescription:
  'Herbal liver tonic for optimal digestion and detoxification.',
  fullDescription:
  'A potent blend of natural herbs that rejuvenate the liver, stimulate appetite, and improve digestion. MalboLiv® protects the liver from toxins and aids in faster recovery from illnesses.',
  benefits: [
  'Stimulates sluggish liver',
  'Improves appetite and feed intake',
  'Aids in detoxification',
  'Enhances overall digestion'],

  ingredients: [
  'Andrographis paniculata',
  'Eclipta alba',
  'Phyllanthus niruri',
  'Boerhavia diffusa'],

  animals: ['Cow', 'Buffalo', 'Goat', 'Poultry'],
  category: 'Digestion Care',
  image:
  'https://images.unsplash.com/photo-1564860459740-1011ce0be223?auto=format&fit=crop&q=80&w=800',
  rating: 4.8,
  reviews: 198,
  variants: ['500 ml', '1 Liter', '5 Liter'],
  usage: 'Cattle: 50ml daily. Poultry: 10-20ml per 100 birds.'
}];