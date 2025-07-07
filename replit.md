# Replit.md - Glameili Interior Décor Portfolio

## Overview

This is a modern React-based portfolio website for Glameili, an interior décor company. The application showcases a creative, animated portfolio with an ochre yellow and beige color scheme, featuring smooth animations, interactive elements, and a responsive design.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom ochre/beige color palette
- **UI Components**: Radix UI components via shadcn/ui
- **Animations**: GSAP (GreenSock Animation Platform) for complex animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store
- **API**: RESTful API structure with Express routes

### Development Setup
- **TypeScript**: Full TypeScript support across client and server
- **Module System**: ES Modules throughout
- **Path Mapping**: Configured aliases for clean imports (@/, @shared/, @assets/)
- **Hot Reload**: Vite HMR for fast development

## Key Components

### Frontend Components
1. **Hero Section**: Animated brand name with variable font weight effects
2. **About Section**: Scrambled text animation with rotating logo
3. **Work Showcase**: Interactive before/after image transitions
4. **Gallery Section**: Expandable category boxes with hover effects
5. **Contact Form**: Glassmorphism-styled form with Formspree integration
6. **Navigation**: Fixed navbar with smooth scrolling

### Animation System
- **VariableText**: Mouse-proximity font weight animations
- **ScrambledText**: GSAP-powered text scrambling effects
- **GradientText**: Moving gradient text animations
- **Parallax**: Scroll-based background animations
- **Hover Effects**: Scale and transition animations

### UI Framework
- **Design System**: shadcn/ui components with custom theming
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: ARIA-compliant components from Radix UI
- **Toast Notifications**: Integrated feedback system

## Data Flow

### Client-Side Flow
1. **Route Handling**: Wouter manages client-side navigation
2. **Component Lifecycle**: React components with hooks for animations
3. **State Management**: React Query for API calls and caching
4. **Animation Triggers**: GSAP ScrollTrigger for scroll-based animations

### Server-Side Flow
1. **Request Processing**: Express middleware for logging and error handling
2. **Database Operations**: Drizzle ORM with PostgreSQL
3. **Session Management**: PostgreSQL-backed sessions
4. **Static Assets**: Vite-handled static file serving

### Database Schema
- **Users Table**: Basic user authentication structure
- **Schema Location**: `/shared/schema.ts` for shared types
- **Migration System**: Drizzle Kit for database migrations

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Query
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **UI Components**: Radix UI primitives
- **Animations**: GSAP, Embla Carousel
- **Forms**: React Hook Form, Hookform Resolvers
- **Utilities**: date-fns, nanoid, zod

### Backend Dependencies
- **Server**: Express.js, tsx for TypeScript execution
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session**: connect-pg-simple
- **Development**: esbuild, Vite plugins

### External Services
- **Form Handling**: Formspree integration for contact form
- **Database**: Neon Database (PostgreSQL as a service)
- **Assets**: Unsplash images for placeholder content

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `/dist/public`
2. **Backend Build**: esbuild bundles server code to `/dist/index.js`
3. **Asset Optimization**: Vite handles code splitting and asset optimization

### Production Configuration
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Static Serving**: Express serves built React app
- **Database Migrations**: Drizzle Kit push command for schema updates

### Development vs Production
- **Development**: tsx for TypeScript execution, Vite dev server
- **Production**: Node.js with built JavaScript bundle
- **Replit Integration**: Special handling for Replit environment

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 07, 2025. Initial setup