import { db } from "./db";
import { galleryImages } from "@shared/schema";

const sampleImages = [
  {
    title: "Modern Living Room",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "residential",
    description: "Contemporary living space with clean lines and warm tones",
    isActive: true,
  },
  {
    title: "Luxury Bedroom Suite",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "residential",
    description: "Elegant bedroom design with premium finishes",
    isActive: true,
  },
  {
    title: "Gourmet Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "residential",
    description: "Modern kitchen with state-of-the-art appliances",
    isActive: true,
  },
  {
    title: "Corporate Office Space",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "commercial",
    description: "Professional office environment designed for productivity",
    isActive: true,
  },
  {
    title: "Restaurant Interior",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "commercial",
    description: "Sophisticated dining space with ambient lighting",
    isActive: true,
  },
  {
    title: "Retail Showroom",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "commercial",
    description: "Modern retail space designed to enhance customer experience",
    isActive: true,
  },
];

export async function seedDatabase() {
  try {
    console.log("Seeding database with sample gallery images...");
    
    for (const image of sampleImages) {
      await db.insert(galleryImages).values(image).onConflictDoNothing();
    }
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0));
}