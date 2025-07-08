import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGalleryImageSchema, type InsertGalleryImage } from "@shared/schema";
import { z } from "zod";

// Simple admin auth middleware
const adminAuth = (req: any, res: any, next: any) => {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const auth = req.headers.authorization;
  
  if (!auth || auth !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ message: "Admin authentication required" });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Gallery API routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  app.get("/api/gallery/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const images = await storage.getGalleryImagesByCategory(category);
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images by category:", error);
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  // Admin routes
  app.post("/api/admin/gallery", adminAuth, async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating gallery image:", error);
      res.status(500).json({ message: "Failed to create gallery image" });
    }
  });

  app.put("/api/admin/gallery/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertGalleryImageSchema.partial().parse(req.body);
      const image = await storage.updateGalleryImage(id, validatedData);
      res.json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating gallery image:", error);
      res.status(500).json({ message: "Failed to update gallery image" });
    }
  });

  app.delete("/api/admin/gallery/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteGalleryImage(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      res.status(500).json({ message: "Failed to delete gallery image" });
    }
  });

  app.patch("/api/admin/gallery/:id/toggle", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const image = await storage.toggleImageStatus(id);
      res.json(image);
    } catch (error) {
      console.error("Error toggling gallery image status:", error);
      res.status(500).json({ message: "Failed to toggle gallery image status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
