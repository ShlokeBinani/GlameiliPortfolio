import { 
  type GalleryImage,
} from "@shared/schema";
import fs from 'fs';
import path from 'path';

export interface IStorage {
  // Gallery operations
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImagesByCategory(category: string): Promise<GalleryImage[]>;
}

export class FileSystemStorage implements IStorage {
  private galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery');

  private async readImagesFromDirectory(dir: string = ''): Promise<GalleryImage[]> {
    const fullPath = path.join(this.galleryPath, dir);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      return [];
    }

    try {
      const files = fs.readdirSync(fullPath);
      const images: GalleryImage[] = [];
      
      let id = 1;
      for (const file of files) {
        const filePath = path.join(fullPath, file);
        const stat = fs.statSync(filePath);
        
        // Check if it's a file and has image extension
        if (stat.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
          const webPath = `/images/gallery${dir ? '/' + dir : ''}/${file}`;
          
          images.push({
            id: id++,
            title: file.replace(/\.[^/.]+$/, ""), // Remove extension for title
            description: null,
            imageUrl: webPath,
            category: dir || 'general',
            isActive: true,
            createdAt: stat.birthtime || stat.mtime,
            updatedAt: stat.mtime
          });
        }
      }
      
      return images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error('Error reading images from directory:', error);
      return [];
    }
  }

  async getAllGalleryImages(): Promise<GalleryImage[]> {
    const allImages: GalleryImage[] = [];
    
    // Read from main gallery folder
    const mainImages = await this.readImagesFromDirectory();
    allImages.push(...mainImages);
    
    // Read from subdirectories (categories)
    try {
      if (fs.existsSync(this.galleryPath)) {
        const items = fs.readdirSync(this.galleryPath);
        for (const item of items) {
          const itemPath = path.join(this.galleryPath, item);
          if (fs.statSync(itemPath).isDirectory()) {
            const categoryImages = await this.readImagesFromDirectory(item);
            allImages.push(...categoryImages);
          }
        }
      }
    } catch (error) {
      console.error('Error reading categories:', error);
    }
    
    return allImages;
  }

  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    return await this.readImagesFromDirectory(category);
  }
}

export const storage = new FileSystemStorage();
