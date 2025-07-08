# Glameili Portfolio Website

A beautiful interior design portfolio website with a clean, modern interface.

## Features

✅ **No Admin Panel** - Simple file-based image management
✅ **No Database Required** - Images are served directly from folders
✅ **Stunning Animations** - Professional GSAP-powered entrance and scroll-triggered animations
✅ **Enhanced Hero Section** - Floating elements, parallax effects, and interactive CTA button
✅ **Interactive Gallery** - Before/after transitions with smooth hover effects and staggered animations
✅ **Dynamic About Section** - Floating logo, shimmer effects, and pixelated hover interactions
✅ **Smart Navigation** - Animated navbar with glass morphism and smooth scrolling
✅ **Enhanced Contact Form** - Loading animations, success states, and interactive form fields
✅ **Micro-Interactions** - Hover effects, button animations, and visual feedback throughout
✅ **Active Contact Form** - Connected to Formspree for real message delivery
✅ **Cross-Platform** - Works on Windows, macOS, and Linux
✅ **Responsive Design** - Looks great on all devices with smooth animations

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

### How to Create Before/After Pairs:
1. **Name your files** with "before" and "after" in the filename:
   ```
   kitchen-renovation-before.jpg
   kitchen-renovation-after.jpg
   ```
2. **Put both files** in `public/images/gallery/transition-to-complete/`
3. **They'll automatically pair up** and become interactive!

### About Section
- **Hover Effect**: When you hover over the about text, it gets a pixelated effect with enhanced contrast and saturation
- **Improved Layout**: Logo and content are properly spaced and centered for better visual balance
- **Responsive Design**: Clean layout that works perfectly on all screen sizes
- **Smooth Transitions**: Clean animations for all interactions

### Navigation
- **Animated Entrance**: Navbar slides down on page load with staggered menu items
- **Glass Morphism**: Dynamic background blur and transparency effects
- **Smooth Scrolling**: Enhanced smooth scrolling with proper offset positioning
- **Interactive Menu**: Hover effects with underline animations and background highlights
- **Mobile Menu**: Animated hamburger icon with smooth mobile menu transitions
- **Fixed Header**: Navigation stays visible while scrolling with dynamic background

## 🌟 Enhanced UX & Animations

### Hero Section Enhancements
- **Staggered Entrance**: Title and tagline animate in with spring physics
- **Floating Elements**: Subtle floating animation for the main content
- **Parallax Background**: Multiple parallax layers with floating geometric shapes
- **Interactive CTA**: "Explore Our Work" button with hover effects and smooth scroll
- **Background Elements**: Animated floating circles with pulse and bounce effects

### Gallery Section Wow Factors
- **Scroll-Triggered Animations**: Elements animate in as you scroll down
- **Staggered Card Entrance**: Category cards bounce in with spring animations
- **Enhanced Hover Effects**: Cards lift up with shadows and scale transformations
- **Image Transitions**: Smooth scale and brightness effects on image hover
- **Before/After Magic**: Enhanced transitions with scale and fade effects
- **Background Atmosphere**: Floating elements create depth and visual interest

### About Section Interactivity
- **Logo Entrance**: Logo slides in from left with rotation and spring physics
- **Content Slide**: Text content slides in from right with smooth easing
- **Floating Logo**: Continuous subtle floating animation with hover enhancements
- **Shimmer Effects**: Hover on logo creates beautiful shimmer and glow effects
- **Pixelated Text**: Enhanced hover effects with sparkle animations
- **Interactive Tags**: Hover effects on skill tags with scale transformations

### Contact Form Experience
- **Form Entrance**: Form slides up with back-easing animation
- **Field Focus**: Form fields lift slightly when focused with smooth transitions
- **Loading States**: Animated spinner and smooth button transformations
- **Success Feedback**: Form pulses and shows success message with animations
- **Error Handling**: Shake animation for errors with visual feedback
- **Hover Effects**: Smooth button hover with shimmer sweep animation

### Micro-Interactions Throughout
- **Button Animations**: Scale and hover effects on all interactive elements
- **Loading Indicators**: Professional spinning loaders with smooth transitions
- **Hover Feedback**: Immediate visual feedback on all clickable elements
- **Scroll Indicators**: Smooth scroll progress with proper easing
- **Toast Notifications**: Animated success/error messages with emojis
- **Form Validation**: Real-time visual feedback with smooth transitions

### Performance Optimizations
- **GSAP Powered**: Hardware-accelerated animations using GSAP
- **Smooth 60fps**: All animations optimized for smooth performance
- **Lazy Loading**: Scroll-triggered animations only when elements are visible
- **Cleanup**: Proper animation cleanup to prevent memory leaks

## No Database Setup Required!

This portfolio uses a simple file-based system instead of a database. Just add images to folders and they'll appear automatically in your gallery.

## 🎯 The Complete Experience

Your Glameili portfolio now delivers a **premium, interactive experience** that will wow visitors:

- ✨ **Professional animations** that rival top design agencies
- 🎨 **Smooth interactions** that feel responsive and modern  
- 📱 **Perfect performance** on all devices and screen sizes
- 🚀 **Lightning fast** loading with optimized animations
- 💎 **Attention to detail** in every micro-interaction

**Ready to impress your clients with a stunning, animated portfolio that showcases your interior design expertise!** 🏆

Enjoy your beautiful, enhanced Glameili portfolio! ✨