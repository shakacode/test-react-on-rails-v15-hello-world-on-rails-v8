# React on Rails Auto-Registration Demo

This application demonstrates React on Rails v15's **file-system-based automated bundle generation** with intelligent bundle splitting and server-side rendering.

📍 **Repository**: https://github.com/shakacode/test-react-on-rails-v15-hello-world-on-rails-v8

## 🚀 Quick Start

1. **Clone**: `git clone https://github.com/shakacode/test-react-on-rails-v15-hello-world-on-rails-v8.git`
2. **Install dependencies**: `bundle && npm install`
3. **Generate component packs**: `bundle exec rake react_on_rails:generate_packs`
4. **Start development server**: `./bin/dev`
5. **Visit the demo**: http://localhost:3000

## 📋 Documentation

### Getting Started
- **[Installation Troubleshooting](./INSTALLATION_TROUBLESHOOTING.md)** - Fix common setup issues including "package.json not found"

### Core Concepts
- **[Architecture Overview](./ARCHITECTURE_OVERVIEW.md)** - System design, bundle splitting, and component patterns

### Technical Implementation  
- **[SSR + Dynamic Imports Guide](./SSR_DYNAMIC_IMPORTS_GUIDE.md)** - Solving FOUC with skeleton loaders and progressive enhancement
- **[Production Testing Guide](./PRODUCTION_TESTING.md)** - Testing production builds and CSS loading behavior

## 🎯 What This Demo Shows

### Component Examples

| Component | Bundle Size | Pattern | Use Case |
|-----------|-------------|---------|-----------|
| **HelloWorld** | 12.5KB (10.0KB JS + 2.5KB CSS) | Full SSR | Lightweight UI components |
| **HeavyMarkdownEditor** | 1.1MB (32KB component + 1,081KB markdown libraries) | Progressive SSR | Rich interactive features |

### Key Features Demonstrated

✅ **Auto-Registration** - Zero manual webpack configuration  
✅ **Bundle Splitting** - Intelligent separation of light/heavy dependencies  
✅ **SSR Support** - Server-side rendering with progressive enhancement  
✅ **FOUC Prevention** - Skeleton loaders eliminate layout shift  
✅ **Performance Optimization** - Fast initial loads with lazy loading  

## 🔧 Development Commands

- `bundle exec rake react_on_rails:generate_packs` - Regenerate webpack entries
- `./bin/dev` - Start Rails + webpack dev servers
- `npm run build` - Build production bundles
- `rake lint` - Run all linters (ESLint + RuboCop)

## 📊 Bundle Analysis (Real Performance Data)

Based on browser dev tools measurements:

**HelloWorld Page (Lightweight):**
- Total resources: 1.1MB
- HelloWorld.js: 10.0KB
- HelloWorld.css: 2.5KB  
- Shared runtime: ~1.1MB (React + webpack)

**HeavyMarkdownEditor Page (Heavy):**
- Total resources: 2.2MB
- HeavyMarkdownEditor.js: 26.5KB
- HeavyMarkdownEditor.css: 5.5KB
- Markdown libraries: 1,081KB additional
- Shared runtime: ~1.1MB (React + webpack)

**Bundle Splitting Benefit:** HelloWorld page loads 50% faster by avoiding the 1.1MB markdown libraries!

---

🎉 **Explore the demo** to see React on Rails auto-registration in action with professional bundle splitting and SSR optimization!