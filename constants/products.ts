export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Audio",
    description: "Premium wireless headphones with noise cancellation",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Wearables",
    description: "Fitness tracking and notifications on your wrist",
  },
  {
    id: "3",
    name: "Leather Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "Accessories",
    description: "Handcrafted genuine leather backpack",
  },
  {
    id: "4",
    name: "Camera Lens",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1606710153934-ccc9d0e7e985?w=500&h=500&fit=crop",
    category: "Photography",
    description: "Professional 50mm f/1.8 prime lens",
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "Footwear",
    description: "Lightweight performance running shoes",
  },
  {
    id: "6",
    name: "Sunglasses",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    category: "Accessories",
    description: "UV protection polarized sunglasses",
  },
  {
    id: "7",
    name: "Portable Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    category: "Audio",
    description: "Waterproof Bluetooth speaker",
  },
  {
    id: "8",
    name: "Desk Lamp",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    category: "Home",
    description: "Adjustable LED desk lamp with touch control",
  },
];
