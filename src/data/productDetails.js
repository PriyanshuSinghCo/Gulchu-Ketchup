const DEFAULT_STORAGE =
  "Store in a cool, dry place away from direct sunlight. Refrigerate after opening and always use a clean, dry spoon.";

export const productDetails = [
  {
    id: "tomato-ketchup",
    name: "Tomato Ketchup",
    path: "/product/TomatoKetchup",
    category: "Sauces",
    image: "/img/cutout/TomatoKetchup.webp",
    accent: "#b3261e",
    tagline: "Tangy, sweet & made from ripe tomatoes",
    description:
      "Gulchu Tomato Ketchup is crafted from farm-fresh, sun-ripened Chatra tomatoes, blended with a carefully selected mix of spices and natural sweeteners. It delivers the perfect harmony of tangy and sweet flavours with a rich, smooth texture that enhances any dish.",
    pairings: ["French fries", "Pakoras & samosas", "Burgers", "Sandwiches & wraps", "Evening snacks"],
    storage: "Store in a cool, dry place. Once opened, refrigerate and consume within 3 months.",
    shelfLife: "12 months from the date of manufacture",
    variants: [
      { size: "1kg", price: 120 },
      { size: "500g", price: 70 },
      { size: "200g", price: 40 },
    ],
  },
  {
    id: "red-chilli-sauce",
    name: "Red Chilli Sauce",
    path: "/product/RedChilliSauce",
    category: "Sauces",
    image: "/img/Ketchup-gr.webp",
    accent: "#8f1a1a",
    tagline: "Bold heat from real red chillies",
    description:
      "A fiery blend of real red chillies with bold spices. Perfect for Indo-Chinese dishes, rolls and marinades — just a few drops add a punchy, tangy kick.",
    pairings: ["Chowmein", "Rolls & wraps", "Chilli paneer", "Marinades", "Momos"],
    variants: [
      { size: "1kg", price: 130 },
      { size: "500g", price: 80 },
      { size: "200g", price: 40 },
    ],
  },
  {
    id: "green-chilli-sauce",
    name: "Green Chilli Sauce (Spicy)",
    path: "/product/GreenChilli",
    category: "Sauces",
    image: "/img/cutout/GreenChilli.webp",
    accent: "#2f6b2a",
    tagline: "Spicy, zesty & full of flavour",
    description:
      "Spicy, zesty and full of flavour — made from handpicked green chillies to add a punch to any dish, from street-style snacks to everyday meals.",
    pairings: ["Samosas", "Pakoras", "Sandwiches", "Fried rice", "Rolls"],
    variants: [
      { size: "1kg", price: 140 },
      { size: "700g", price: 110 },
      { size: "500g", price: 85 },
      { size: "200g", price: 45 },
    ],
  },
  {
    id: "schezwan-chutney",
    name: "Schezwan Chutney",
    path: "/product/SchezwanChutney",
    category: "Condiments",
    image: "/img/cutout/GreenChilli.webp",
    accent: "#a5361c",
    tagline: "Indo-Chinese fire with garlic & chilli",
    description:
      "A bold Indo-Chinese fusion chutney with garlic, chillies and soy sauce. Use it as a dip, a spread or a stir-fry base for instant restaurant-style flavour.",
    pairings: ["Fried rice", "Noodles", "Momos", "Spring rolls", "Dips"],
    variants: [
      { size: "1kg", price: 150 },
      { size: "300g", price: 60 },
    ],
  },
  {
    id: "pizza-pasta-sauce",
    name: "Pizza & Pasta Sauce",
    path: "/product/PizzaPastaSauce",
    category: "Sauces",
    image: "/img/cutout/ContinentalSauce.webp",
    accent: "#b4442a",
    tagline: "Italian-style tomato, basil & herbs",
    description:
      "Classic Italian-style sauce made from tomatoes, basil and spices — ready to lift homemade pizzas and pastas instantly.",
    pairings: ["Pizza", "Pasta", "Garlic bread", "Sandwiches"],
    variants: [
      { size: "1kg", price: 150 },
      { size: "500g", price: 90 },
    ],
  },
  {
    id: "garlic-paste",
    name: "Garlic Paste",
    path: "/product/GarlicPaste",
    category: "Pastes",
    image: "/img/cutout/ContinentalSauce.webp",
    accent: "#8a6a2f",
    tagline: "Freshly ground, ready to cook",
    description:
      "Freshly ground garlic paste, hygienically packed. A must-have for everyday Indian cooking that saves peeling and grinding time.",
    pairings: ["Dal tadka", "Curries", "Marinades", "Chutneys"],
    variants: [
      { size: "1kg", price: 120 },
      { size: "500g", price: 70 },
      { size: "200g", price: 35 },
    ],
  },
  {
    id: "pickles-achar",
    name: "Pickles (Achar)",
    path: "/product/Pickles(Achar)",
    category: "Pickles",
    image: "/img/Ketchup-gr.webp",
    accent: "#7a4a12",
    tagline: "Age-old recipes, homemade taste",
    description:
      "Traditional Indian pickles prepared with age-old recipes and locally sourced ingredients. Available in Mango, Mixed and Green Chilli flavours.",
    pairings: ["Paratha", "Dal-chawal", "Khichdi", "Puri"],
    variants: [
      { size: "200g", price: 45 },
      { size: "400g", price: 80 },
      { size: "1kg (Glass Jar)", price: 150 },
      { size: "5kg", price: 600 },
    ],
  },
  {
    id: "veg-mayonnaise",
    name: "Veg Mayonnaise",
    path: "/product/VegMayonnaise",
    category: "Condiments",
    image: "/img/cutout/ContinentalSauce.webp",
    accent: "#9a7b3c",
    tagline: "Rich, creamy & eggless",
    description:
      "Creamy, rich veg mayo that is perfect for sandwiches, burgers, wraps and dips — smooth texture with a mild, tangy taste.",
    pairings: ["Sandwiches", "Burgers", "Wraps", "Dips", "Fries"],
    variants: [
      { size: "250g", price: 45 },
      { size: "400g", price: 75 },
      { size: "900g", price: 140 },
    ],
  },
  {
    id: "momos-chutney",
    name: "Momos Chutney",
    path: "/product/MomosChutney",
    category: "Condiments",
    image: "/img/cutout/GreenChilli.webp",
    accent: "#b23a1f",
    tagline: "That street-style red chutney",
    description:
      "Spicy and flavourful chutney to pair with steamed or fried momos. A favourite among spice lovers — tastes just like the street-side stall.",
    pairings: ["Steamed momos", "Fried momos", "Spring rolls", "Pakoras"],
    variants: [
      { size: "300g", price: 50 },
      { size: "700g", price: 100 },
    ],
  },
  {
    id: "soya-sauce",
    name: "Soya Sauce",
    path: "/product/SoyaSauce",
    category: "Sauces",
    image: "/img/cutout/ContinentalSauce.webp",
    accent: "#3b2418",
    tagline: "Dark, savoury & umami rich",
    description:
      "A rich fermented soy sauce ideal for stir-frying, marinating and Asian-style cooking. Adds deep colour and savoury flavour.",
    pairings: ["Stir-fry", "Noodles", "Fried rice", "Marinades"],
    variants: [{ size: "700ml", price: 90 }],
  },
].map((product) => ({ storage: DEFAULT_STORAGE, ...product }));

export function getProductDetail(id) {
  return productDetails.find((product) => product.id === id);
}
