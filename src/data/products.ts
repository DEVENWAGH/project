import { nanoid } from 'nanoid';
import { Product } from '../types';

export const products: Product[] = [
  // Monitors
  {
    id: nanoid(),
    name: "Pro XDR Monitor 32\"",
    category: "monitors",
    brand: "Apple",
    price: 1499.99,
    stock: 10,
    rating: 4.7,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Experience stunning visuals with our 32-inch 4K monitor. Perfect for creative professionals and gamers alike.",
    specifications: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "Panel Type": "IPS",
      "Refresh Rate": "144Hz",
      "Response Time": "1ms",
      "Screen Size": "32\"",
      "Connectivity": "HDMI 2.1, DisplayPort 1.4, USB-C"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 245
  },
  // Laptops
  {
    id: nanoid(),
    name: "UltraBook Pro 16",
    category: "laptops",
    brand: "Apple",
    price: 1899.99,
    stock: 5,
    rating: 4.9,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Ultra-thin and powerful laptop featuring the latest processor and stunning display quality.",
    specifications: {
      "Processor": "Intel Core i9, 12-core",
      "RAM": "32GB DDR5",
      "Storage": "1TB SSD",
      "Display": "16-inch Retina XDR",
      "Battery": "Up to 22 hours"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 320
  },
  // Smartphones
  {
    id: nanoid(),
    name: "SmartPhone X Pro",
    category: "smartphones",
    brand: "Samsung",
    price: 999.99,
    discountPrice: 899.99,
    stock: 15,
    rating: 4.8,
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Our latest flagship smartphone with an incredible camera system and all-day battery life.",
    specifications: {
      "Display": "6.7-inch OLED",
      "Processor": "A16 Bionic chip",
      "Camera": "Triple 48MP system",
      "Battery": "4500mAh",
      "Storage": "256GB"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 510
  },
  // Audio Devices
  {
    id: nanoid(),
    name: "Wireless Noise-Cancelling Headphones",
    category: "audio",
    brand: "Sony",
    price: 349.99,
    stock: 20,
    rating: 4.6,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Immerse yourself in your favorite music with our premium noise-cancelling headphones.",
    specifications: {
      "Driver": "40mm with neodymium magnets",
      "Frequency Response": "4Hz-40,000Hz",
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.2, 3.5mm jack",
      "Features": "Active Noise Cancellation, Transparency Mode"
    },
    createdAt: new Date().toISOString(),
    totalSold: 423
  },
  // Gaming Consoles
  {
    id: nanoid(),
    name: "Gaming Console Pro",
    category: "gaming",
    brand: "Microsoft",
    price: 499.99,
    stock: 8,
    rating: 4.9,
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/159393/gamepad-video-game-controller-game-controller-controller-159393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "The next generation gaming console with stunning graphics and lightning-fast load times.",
    specifications: {
      "CPU": "Octa-core custom Zen 2",
      "GPU": "RDNA 2 architecture, 10.3 TFLOPS",
      "Storage": "1TB SSD",
      "Resolution": "Up to 8K",
      "Frame Rate": "Up to 120fps"
    },
    createdAt: new Date().toISOString(),
    totalSold: 289
  },
  // Televisions
  {
    id: nanoid(),
    name: "Ultra 4K Smart TV 65\"",
    category: "televisions",
    brand: "LG",
    price: 1299.99,
    discountPrice: 1099.99,
    stock: 12,
    rating: 4.5,
    image: "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Transform your living room with our 65-inch 4K smart TV featuring vibrant colors and smart connectivity.",
    specifications: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "HDR": "Dolby Vision, HDR10+",
      "Refresh Rate": "120Hz",
      "Smart Features": "Voice Control, App Store",
      "Connectivity": "HDMI 2.1, Wi-Fi 6, Bluetooth 5.0"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 178
  },
  // Accessories
  {
    id: nanoid(),
    name: "Wireless Charging Pad",
    category: "accessories",
    brand: "Samsung",
    price: 49.99,
    stock: 30,
    rating: 4.3,
    image: "https://images.pexels.com/photos/5240543/pexels-photo-5240543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/5240543/pexels-photo-5240543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5240544/pexels-photo-5240544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Convenient wireless charging for all Qi-compatible devices. Sleek design fits any desk or nightstand.",
    specifications: {
      "Input": "USB-C, 5V/2A",
      "Output": "15W max",
      "Compatibility": "Qi-enabled devices",
      "Features": "Temperature control, Foreign object detection",
      "Size": "100 x 100 x 10 mm"
    },
    createdAt: new Date().toISOString(),
    totalSold: 612
  },
  // Smart Home
  {
    id: nanoid(),
    name: "Smart Home Hub",
    category: "smart home",
    brand: "Amazon",
    price: 129.99,
    stock: 18,
    rating: 4.4,
    image: "https://images.pexels.com/photos/1034808/pexels-photo-1034808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1034808/pexels-photo-1034808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4219883/pexels-photo-4219883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Control your entire smart home with our intuitive hub. Compatible with all major smart home devices.",
    specifications: {
      "Connectivity": "Wi-Fi, Bluetooth, Zigbee, Z-Wave",
      "Voice Assistants": "Alexa, Google Assistant, Siri",
      "Compatibility": "Over 10,000 devices",
      "Security": "End-to-end encryption",
      "Power": "AC adapter, battery backup"
    },
    createdAt: new Date().toISOString(),
    totalSold: 342
  },
  // Additional products to ensure we have all brands represented and 30 total products
  // Dell Products
  {
    id: nanoid(),
    name: "XPS 15 Ultra Laptop",
    category: "laptops",
    brand: "Dell",
    price: 1799.99,
    stock: 12,
    rating: 4.7,
    image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Premium ultrabook with stunning InfinityEdge display and powerful performance for professionals.",
    specifications: {
      "Processor": "Intel Core i7, 12th Gen",
      "RAM": "16GB DDR5",
      "Storage": "512GB NVMe SSD",
      "Display": "15.6-inch 4K OLED",
      "Battery": "Up to 12 hours"
    },
    createdAt: new Date().toISOString(),
    totalSold: 187
  },
  {
    id: nanoid(),
    name: "UltraSharp 27\" Monitor",
    category: "monitors",
    brand: "Dell",
    price: 499.99,
    stock: 15,
    rating: 4.6,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Professional-grade monitor with accurate color reproduction and ergonomic design.",
    specifications: {
      "Resolution": "2560 x 1440 (QHD)",
      "Panel Type": "IPS",
      "Refresh Rate": "75Hz",
      "Response Time": "5ms",
      "Screen Size": "27\"",
      "Connectivity": "HDMI, DisplayPort, USB-C"
    },
    createdAt: new Date().toISOString(),
    totalSold: 234
  },
  
  // HP Products
  {
    id: nanoid(),
    name: "Spectre x360 Convertible",
    category: "laptops",
    brand: "HP",
    price: 1299.99,
    stock: 8,
    rating: 4.5,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Versatile 2-in-1 laptop with premium design and all-day battery life.",
    specifications: {
      "Processor": "Intel Core i7, 11th Gen",
      "RAM": "16GB DDR4",
      "Storage": "1TB PCIe SSD",
      "Display": "13.5-inch 4K Touch",
      "Battery": "Up to 15 hours"
    },
    createdAt: new Date().toISOString(),
    totalSold: 156
  },
  {
    id: nanoid(),
    name: "OMEN 27\" Gaming Monitor",
    category: "monitors",
    brand: "HP",
    price: 699.99,
    stock: 10,
    rating: 4.7,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "High-performance gaming monitor with AMD FreeSync and ultra-fast response time.",
    specifications: {
      "Resolution": "2560 x 1440 (QHD)",
      "Panel Type": "VA",
      "Refresh Rate": "165Hz",
      "Response Time": "1ms",
      "Screen Size": "27\"",
      "Connectivity": "HDMI 2.0, DisplayPort 1.4"
    },
    createdAt: new Date().toISOString(),
    totalSold: 208
  },
  
  // Lenovo Products
  {
    id: nanoid(),
    name: "ThinkPad X1 Carbon",
    category: "laptops",
    brand: "Lenovo",
    price: 1399.99,
    stock: 9,
    rating: 4.8,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Legendary business laptop with military-grade durability and exceptional performance.",
    specifications: {
      "Processor": "Intel Core i7, 12th Gen",
      "RAM": "16GB LPDDR5",
      "Storage": "512GB PCIe SSD",
      "Display": "14-inch QHD+ Anti-glare",
      "Battery": "Up to 19 hours"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 267
  },
  {
    id: nanoid(),
    name: "Legion 5 Pro Gaming Laptop",
    category: "laptops",
    brand: "Lenovo",
    price: 1599.99,
    discountPrice: 1399.99,
    stock: 7,
    rating: 4.7,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "High-performance gaming laptop with QHD display and advanced cooling system.",
    specifications: {
      "Processor": "AMD Ryzen 7 5800H",
      "Graphics": "NVIDIA RTX 3070",
      "RAM": "16GB DDR4",
      "Storage": "1TB SSD",
      "Display": "16-inch QHD 165Hz"
    },
    createdAt: new Date().toISOString(),
    totalSold: 189
  },
  
  // Asus Products
  {
    id: nanoid(),
    name: "ROG Zephyrus G14",
    category: "laptops",
    brand: "Asus",
    price: 1499.99,
    stock: 6,
    rating: 4.9,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Ultra-powerful compact gaming laptop with AniMe Matrix display and exceptional battery life.",
    specifications: {
      "Processor": "AMD Ryzen 9 5900HS",
      "Graphics": "NVIDIA RTX 3060",
      "RAM": "16GB DDR4",
      "Storage": "1TB NVMe SSD",
      "Display": "14-inch QHD 120Hz"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 312
  },
  {
    id: nanoid(),
    name: "ProArt Display PA278CV 27\"",
    category: "monitors",
    brand: "Asus",
    price: 399.99,
    stock: 14,
    rating: 4.6,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Professional monitor with 100% sRGB color gamut and Calman Verified accuracy.",
    specifications: {
      "Resolution": "2560 x 1440 (QHD)",
      "Panel Type": "IPS",
      "Refresh Rate": "75Hz",
      "Response Time": "5ms",
      "Screen Size": "27\"",
      "Connectivity": "HDMI, DisplayPort, USB-C"
    },
    createdAt: new Date().toISOString(),
    totalSold: 178
  },
  
  // Acer Products
  {
    id: nanoid(),
    name: "Predator Helios 300",
    category: "laptops",
    brand: "Acer",
    price: 1299.99,
    discountPrice: 1149.99,
    stock: 11,
    rating: 4.5,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Powerful gaming laptop with 144Hz display and advanced cooling technology.",
    specifications: {
      "Processor": "Intel Core i7-11800H",
      "Graphics": "NVIDIA RTX 3060",
      "RAM": "16GB DDR4",
      "Storage": "512GB NVMe SSD",
      "Display": "15.6-inch FHD 144Hz"
    },
    createdAt: new Date().toISOString(),
    totalSold: 231
  },
  {
    id: nanoid(),
    name: "Nitro XV340CK 34\" Ultrawide",
    category: "monitors",
    brand: "Acer",
    price: 499.99,
    discountPrice: 449.99,
    stock: 9,
    rating: 4.4,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Immersive ultrawide gaming monitor with 1ms response time and AMD FreeSync Premium.",
    specifications: {
      "Resolution": "3440 x 1440 (UWQHD)",
      "Panel Type": "IPS",
      "Refresh Rate": "144Hz",
      "Response Time": "1ms",
      "Screen Size": "34\"",
      "Connectivity": "HDMI 2.0, DisplayPort 1.4"
    },
    createdAt: new Date().toISOString(),
    totalSold: 145
  },
  
  // More Apple Products
  {
    id: nanoid(),
    name: "MacBook Air M2",
    category: "laptops",
    brand: "Apple",
    price: 1199.99,
    stock: 15,
    rating: 4.8,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Ultra-thin laptop with all-day battery life and powerful M2 chip for exceptional performance.",
    specifications: {
      "Processor": "Apple M2",
      "RAM": "8GB Unified Memory",
      "Storage": "256GB SSD",
      "Display": "13.6-inch Liquid Retina",
      "Battery": "Up to 18 hours"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 378
  },
  
  // More Samsung Products
  {
    id: nanoid(),
    name: "Odyssey G9 49\" Gaming Monitor",
    category: "monitors",
    brand: "Samsung",
    price: 1299.99,
    stock: 6,
    rating: 4.7,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Massive curved ultrawide gaming monitor with QLED technology and lightning-fast refresh rate.",
    specifications: {
      "Resolution": "5120 x 1440 (DQHD)",
      "Panel Type": "QLED",
      "Refresh Rate": "240Hz",
      "Response Time": "1ms",
      "Screen Size": "49\"",
      "Connectivity": "HDMI 2.0, DisplayPort 1.4"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 98
  },
  {
    id: nanoid(),
    name: "Galaxy Book Pro",
    category: "laptops",
    brand: "Samsung",
    price: 1099.99,
    stock: 13,
    rating: 4.5,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Ultra-thin laptop with vibrant AMOLED display and seamless integration with Galaxy devices.",
    specifications: {
      "Processor": "Intel Core i7-1165G7",
      "RAM": "16GB LPDDR4x",
      "Storage": "512GB NVMe SSD",
      "Display": "13.3-inch FHD AMOLED",
      "Battery": "Up to 20 hours"
    },
    createdAt: new Date().toISOString(),
    totalSold: 184
  },
  
  // More Sony Products
  {
    id: nanoid(),
    name: "BRAVIA XR A80J OLED TV 65\"",
    category: "televisions",
    brand: "Sony",
    price: 1999.99,
    discountPrice: 1799.99,
    stock: 7,
    rating: 4.9,
    image: "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Stunning OLED TV with cognitive intelligence processor for lifelike picture quality.",
    specifications: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "HDR": "Dolby Vision, HDR10, HLG",
      "Refresh Rate": "120Hz",
      "Panel Type": "OLED",
      "Smart Features": "Google TV, Voice Control",
      "Connectivity": "HDMI 2.1, eARC, VRR, ALLM"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 112
  },
  {
    id: nanoid(),
    name: "WH-1000XM5 Wireless Headphones",
    category: "audio",
    brand: "Sony",
    price: 399.99,
    stock: 22,
    rating: 4.9,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Industry-leading noise cancellation headphones with exceptional sound quality and comfort.",
    specifications: {
      "Driver": "30mm Carbon Fiber",
      "Frequency Response": "4Hz-40,000Hz",
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.2, 3.5mm jack",
      "Features": "Advanced Noise Cancellation, DSEE Extreme"
    },
    createdAt: new Date().toISOString(),
    totalSold: 426
  },
  
  // More LG Products
  {
    id: nanoid(),
    name: "UltraGear 27\" Gaming Monitor",
    category: "monitors",
    brand: "LG",
    price: 599.99,
    discountPrice: 499.99,
    stock: 11,
    rating: 4.6,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "High-performance gaming monitor with Nano IPS technology and G-Sync compatibility.",
    specifications: {
      "Resolution": "2560 x 1440 (QHD)",
      "Panel Type": "Nano IPS",
      "Refresh Rate": "165Hz",
      "Response Time": "1ms",
      "Screen Size": "27\"",
      "Connectivity": "HDMI 2.0, DisplayPort 1.4"
    },
    createdAt: new Date().toISOString(),
    totalSold: 189
  },
  {
    id: nanoid(),
    name: "OLED C1 Series 55\" TV",
    category: "televisions",
    brand: "LG",
    price: 1499.99,
    discountPrice: 1299.99,
    stock: 9,
    rating: 4.8,
    image: "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Self-lit OLED pixels for perfect black and infinite contrast with incredible gaming features.",
    specifications: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "HDR": "Dolby Vision, HDR10, HLG",
      "Refresh Rate": "120Hz",
      "Panel Type": "OLED",
      "Smart Features": "webOS, ThinQ AI",
      "Connectivity": "HDMI 2.1, eARC, VRR, ALLM"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 215
  },
  
  // More Microsoft Products
  {
    id: nanoid(),
    name: "Surface Laptop 4",
    category: "laptops",
    brand: "Microsoft",
    price: 1299.99,
    stock: 14,
    rating: 4.7,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Sleek and stylish laptop with all-day battery life and vibrant PixelSense touchscreen.",
    specifications: {
      "Processor": "AMD Ryzen 7 4980U",
      "RAM": "16GB LPDDR4x",
      "Storage": "512GB SSD",
      "Display": "13.5-inch PixelSense Touch",
      "Battery": "Up to 19 hours"
    },
    createdAt: new Date().toISOString(),
    totalSold: 201
  },
  {
    id: nanoid(),
    name: "Surface Studio 2",
    category: "desktops",
    brand: "Microsoft",
    price: 3499.99,
    stock: 4,
    rating: 4.8,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "All-in-one desktop computer that transforms into a digital drafting table for creative professionals.",
    specifications: {
      "Processor": "Intel Core i7",
      "Graphics": "NVIDIA GTX 1070",
      "RAM": "32GB DDR4",
      "Storage": "1TB SSD",
      "Display": "28-inch PixelSense Touch",
      "Connectivity": "USB-C, USB-A, Ethernet, SD card reader"
    },
    featured: true,
    createdAt: new Date().toISOString(),
    totalSold: 67
  },
  
  // Add a few more products to reach 30 total
  {
    id: nanoid(),
    name: "ProBook 450 G8",
    category: "laptops",
    brand: "HP",
    price: 899.99,
    stock: 18,
    rating: 4.3,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Business laptop with advanced security features and reliable performance.",
    specifications: {
      "Processor": "Intel Core i5-1135G7",
      "RAM": "8GB DDR4",
      "Storage": "256GB SSD",
      "Display": "15.6-inch FHD",
      "Battery": "Up to 12.5 hours"
    },
    createdAt: new Date().toISOString(),
    totalSold: 142
  },
  {
    id: nanoid(),
    name: "Swift 5 Ultrabook",
    category: "laptops",
    brand: "Acer",
    price: 999.99,
    stock: 12,
    rating: 4.4,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Incredibly light and powerful laptop with antimicrobial Corning Gorilla Glass.",
    specifications: {
      "Processor": "Intel Core i7-1165G7",
      "RAM": "16GB LPDDR4X",
      "Storage": "512GB NVMe SSD",
      "Display": "14-inch FHD IPS Touch",
      "Battery": "Up to 15 hours"
    },
    createdAt: new Date().toISOString(),
    totalSold: 113
  },
  {
    id: nanoid(),
    name: "Chromebook Duet",
    category: "laptops",
    brand: "Lenovo",
    price: 299.99,
    discountPrice: 249.99,
    stock: 25,
    rating: 4.3,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "2-in-1 detachable Chromebook with outstanding battery life and included keyboard.",
    specifications: {
      "Processor": "MediaTek Helio P60T",
      "RAM": "4GB LPDDR4X",
      "Storage": "64GB eMMC",
      "Display": "10.1-inch FHD IPS",
      "Battery": "Up to 10 hours"
    },
    createdAt: new Date().toISOString(),
    totalSold: 287
  }
];

export const getProducts = () => products;

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryName: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  );
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getRelatedProducts = (productId: string, limit = 4) => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};

export const getCategories = () => {
  return [...new Set(products.map(product => product.category))];
};

export const getBrands = () => {
  return [...new Set(products.map(product => product.brand))];
};

export const getNewArrivals = (limit = 8) => {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};