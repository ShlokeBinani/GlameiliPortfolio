# Glameili Portfolio Website

A beautiful interior design portfolio website with a clean, modern interface.

## Features

✅ **No Admin Panel** - Simple file-based image management
✅ **No Database Required** - Images are served directly from folders
✅ **Persistent Glameili Animation** - Beautiful landing page animation that doesn't fade
✅ **Cross-Platform** - Works on Windows, macOS, and Linux
✅ **Responsive Design** - Looks great on all devices

## How to Run

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The website will be available at `http://localhost:5000`

## Managing Images

### Adding Images
Simply copy your images to the `public/images/gallery/` folder:

```
public/images/gallery/
├── image1.jpg
├── image2.png
└── image3.webp
```

### Organizing by Categories
Create subfolders to organize images by category:

```
public/images/gallery/
├── living-room/
│   ├── modern-living.jpg
│   └── cozy-living.png
├── bedroom/
│   ├── master-bedroom.jpg
│   └── guest-room.png
└── kitchen/
    └── modern-kitchen.jpg
```

### Supported Image Formats
- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`

Images are automatically:
- ✅ Detected and displayed
- ✅ Sorted by date (newest first)
- ✅ Organized by folder (categories)
- ✅ Accessible via API at `/api/gallery`

## Project Structure

```
├── client/          # Frontend React app
├── server/          # Backend Express server
├── public/images/   # Your image files go here
└── shared/          # Shared TypeScript types
```

## No Database Setup Required!

This portfolio uses a simple file-based system instead of a database. Just add images to folders and they'll appear automatically in your gallery.

Enjoy your beautiful Glameili portfolio! ✨