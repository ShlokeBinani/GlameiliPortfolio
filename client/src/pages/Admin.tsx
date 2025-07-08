import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import type { GalleryImage, InsertGalleryImage } from "@shared/schema";

export default function Admin() {
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<InsertGalleryImage>({
    title: "",
    imageUrl: "",
    category: "residential",
    description: "",
    isActive: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
    enabled: isAuthenticated,
  });

  const createImageMutation = useMutation({
    mutationFn: async (image: InsertGalleryImage) => {
      return apiRequest("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${adminPassword}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(image),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setShowAddForm(false);
      setFormData({
        title: "",
        imageUrl: "",
        category: "residential",
        description: "",
        isActive: true,
      });
      toast({
        title: "Success",
        description: "Image added to gallery",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add image",
        variant: "destructive",
      });
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: async ({ id, ...image }: { id: number } & Partial<InsertGalleryImage>) => {
      return apiRequest(`/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${adminPassword}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(image),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setEditingImage(null);
      toast({
        title: "Success",
        description: "Image updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${adminPassword}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    },
  });

  const toggleImageMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/admin/gallery/${id}/toggle`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${adminPassword}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "Success",
        description: "Image status updated",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update image status",
        variant: "destructive",
      });
    },
  });

  const handleLogin = () => {
    if (adminPassword.trim()) {
      setIsAuthenticated(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingImage) {
      updateImageMutation.mutate({ id: editingImage.id, ...formData });
    } else {
      createImageMutation.mutate(formData);
    }
  };

  const startEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      imageUrl: image.imageUrl,
      category: image.category as "residential" | "commercial",
      description: image.description || "",
      isActive: image.isActive ?? true,
    });
    setShowAddForm(true);
  };

  const cancelEdit = () => {
    setEditingImage(null);
    setShowAddForm(false);
    setFormData({
      title: "",
      imageUrl: "",
      category: "residential",
      description: "",
      isActive: true,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-beige-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-ochre-600">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full bg-ochre-500 hover:bg-ochre-600">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-100 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-ochre-600">Glameili Admin Dashboard</h1>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-ochre-500 hover:bg-ochre-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Image
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-ochre-600">
                {editingImage ? "Edit Image" : "Add New Image"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Image Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Input
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                />
                <Select
                  value={formData.category}
                  onValueChange={(value: "residential" | "commercial") =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={createImageMutation.isPending || updateImageMutation.isPending}
                    className="bg-ochre-500 hover:bg-ochre-600"
                  >
                    {editingImage ? "Update" : "Add"} Image
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="text-center py-8">Loading gallery images...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images?.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-video">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-ochre-600">{image.title}</h3>
                    <Badge variant={image.isActive ? "default" : "secondary"}>
                      {image.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-ochre-500 mb-2 capitalize">{image.category}</p>
                  {image.description && (
                    <p className="text-sm text-gray-600 mb-4">{image.description}</p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(image)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleImageMutation.mutate(image.id)}
                    >
                      {image.isActive ? (
                        <ToggleRight className="w-3 h-3" />
                      ) : (
                        <ToggleLeft className="w-3 h-3" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteImageMutation.mutate(image.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}