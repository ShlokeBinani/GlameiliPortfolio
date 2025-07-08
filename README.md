# Glameili Portfolio Website

A beautiful interior design portfolio website with a clean, modern interface.

## Features

✅ **No Admin Panel** - Simple file-based image management
✅ **No Database Required** - Images are served directly from folders
✅ **Persistent Glameili Animation** - Beautiful landing page animation that doesn't fade
✅ **Hero Showcase** - Multiple before/after pairs with "See Complete" button transitions
✅ **Gallery Before/After** - Interactive fade transitions in gallery categories
✅ **Interactive About Section** - Hover on text to see pixelation effect
✅ **Active Contact Form** - Connected to Formspree for real message delivery
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

### Hero Showcase Images (With "See Complete" Button)
For the main hero section with before/after transitions, put your images in:

```
public/images/showcase/
├── living-room-before.jpg      👈 Your before images
├── living-room-after.jpg       👈 Your after images  
├── kitchen-before.jpg
├── kitchen-after.jpg
├── bedroom-before.jpg
├── bedroom-after.jpg
└── office-before.png
└── office-after.png
```

**To add more image pairs:**
1. Add your images to `public/images/showcase/`
2. Edit `client/src/components/Hero.tsx` and add to the `imagePairs` array:
```javascript
{
  before: "/images/showcase/your-project-before.jpg",
  after: "/images/showcase/your-project-after.jpg", 
  title: "Your Project Title"
}
```

### Gallery Images 
For the main gallery section, copy your images to:

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
├── transition-to-complete/     # Interactive before/after images
│   ├── kitchen-before.jpg      # Pairs automatically with kitchen-after.jpg
│   ├── kitchen-after.jpg       # Click to transition between them
│   ├── living-room-before.png
│   ├── living-room-after.png
│   └── office-renovation.jpg   # Single images work too
│
├── residential/               # Home design projects
│   ├── modern-bedroom.jpg
│   ├── cozy-living.png
│   └── luxury-bathroom.webp
│
└── commercial/               # Business projects  
    ├── office-space.jpg
    ├── restaurant-design.png
    └── retail-store.jpg
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

## Contact Form

The contact form is fully functional and connected to Formspree! Messages submitted through the website will be delivered directly to your email.

- ✅ Form ID: `xvgrjkqq` (already configured)
- ✅ Real-time form validation
- ✅ Success/error notifications
- ✅ Responsive design

## Interactive Features

### Before & After Transitions (Transition to Complete)
- **Smart Pairing**: Images are automatically paired by filename
  - `kitchen-before.jpg` + `kitchen-after.jpg` = Interactive pair
  - `project-before.png` + `project-after.png` = Interactive pair
- **Click to Transform**: Click any before image to see it fade into the after image
- **Visual Indicators**: Hover to see "Show After" / "Show Before" prompts
- **Smooth Animations**: Beautiful GSAP-powered fade transitions
- **Mixed Content**: Mix paired and single images in the same category

### Hero Showcase Features:
- **"See Complete" Button**: Click to transition between before/after images
- **Multiple Image Pairs**: Cycle through different projects automatically
- **Navigation Arrows**: Click left/right to browse image pairs manually
- **Auto-Advance**: Images change every 8 seconds automatically
- **Dot Navigation**: Click dots to jump to specific image pairs
- **Smooth Transitions**: Beautiful GSAP-powered fade animations

### How to Create Gallery Before/After Pairs:
1. **Name your files** with "before" and "after" in the filename:
   ```
   kitchen-renovation-before.jpg
   kitchen-renovation-after.jpg
   ```
2. **Put both files** in `public/images/gallery/transition-to-complete/`
3. **They'll automatically pair up** and become interactive!

### About Section
- **Hover Effect**: When you hover over the about text, it gets a pixelated effect with enhanced contrast and saturation
- **Smooth Transitions**: Clean animations for all interactions

### Navigation
- **Smooth Scrolling**: All navigation links smoothly scroll to their sections
- **Fixed Header**: Navigation stays visible while scrolling
- **Clean Layout**: Streamlined sections without duplication

## No Database Setup Required!

This portfolio uses a simple file-based system instead of a database. Just add images to folders and they'll appear automatically in your gallery.

Enjoy your beautiful Glameili portfolio! ✨