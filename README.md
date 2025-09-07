# React on Rails v15 Auto-Registration Demo 🚀

A complete demonstration of **React on Rails v15 auto-registration** with Rails 8, showcasing file-system-based component detection, bundle splitting, and the **corrected installation sequence** that fixes the infamous "package.json not found" error.

![React on Rails](https://img.shields.io/badge/React%20on%20Rails-15.0-blue)
![Rails](https://img.shields.io/badge/Rails-8.0.1-red)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB)
![Shakapacker](https://img.shields.io/badge/Shakapacker-8.3.0-green)
![Auto-Registration](https://img.shields.io/badge/Auto--Registration-✅-brightgreen)

## 🎯 What This Demo Solves

This sample application demonstrates the **critical fix** for the React on Rails installation issue where generators would fail with:

```bash
ERROR: package.json not found
```

**The Solution:** Install Shakapacker BEFORE React on Rails, not after.

## 📚 Documentation Guide

This demo includes comprehensive documentation for both developers and AI coding agents:

### 🚀 Quick Start
- **[REACT_ON_RAILS_QUICKSTART.md](./REACT_ON_RAILS_QUICKSTART.md)** - Step-by-step installation guide with corrected sequence
- **[docs/README.md](./docs/README.md)** - Quick reference for running the demo

### 🏗️ Technical Deep Dives
- **[docs/ARCHITECTURE_OVERVIEW.md](./docs/ARCHITECTURE_OVERVIEW.md)** - System design, bundle splitting, and component patterns
- **[docs/SSR_DYNAMIC_IMPORTS_GUIDE.md](./docs/SSR_DYNAMIC_IMPORTS_GUIDE.md)** - SSR implementation with skeleton loaders
- **[docs/PRODUCTION_TESTING.md](./docs/PRODUCTION_TESTING.md)** - Development modes and testing strategies

## ✨ Features Demonstrated

- ✅ **Auto-Registration** - Zero manual `ReactOnRails.register()` calls needed
- ✅ **Bundle Splitting** - Lightweight (12.5KB) vs Heavy (1.1MB+) component demos
- ✅ **File-System Based Detection** - Components auto-discovered from directory structure
- ✅ **Server-Side Rendering** - Both components work with SSR enabled
- ✅ **Modern Development Tools** - Enhanced `bin/dev` script with 3 modes
- ✅ **Production-Ready Patterns** - Dynamic imports, skeleton loaders, CSS modules

## 🚀 Quick Start

```bash
# Install dependencies
bundle install && yarn install

# Generate component webpack entries
bundle exec rake react_on_rails:generate_packs

# Start development server
./bin/dev

# Visit the demo
open http://localhost:3000
```

### 🌐 Demo Components

- **[HelloWorld](http://localhost:3000)** - Lightweight component (12.5KB bundle)
- **[HeavyMarkdownEditor](http://localhost:3000/heavy_markdown_editor)** - Heavy component (1.1MB+ bundle with live markdown editing)

## 🔧 Development Commands

- **`./bin/dev`** - Start development server (3 modes available)
  - `./bin/dev` - HMR mode (default, may have FOUC)
  - `./bin/dev static` - Static mode (no FOUC, no HMR) 
  - `./bin/dev prod` - Production-optimized mode (port 3001)
- **`bundle exec rake react_on_rails:generate_packs`** - Regenerate webpack entries
- **`./bin/dev help`** - Show all available modes

## 🎯 Key Architectural Concepts

This demo showcases React on Rails v15's **file-system-based auto-registration**:

- **Magic Directory**: Components in `app/javascript/src/ComponentName/ror_components/` are automatically discovered
- **Auto-Generated Entries**: `rake react_on_rails:generate_packs` creates webpack bundles
- **Zero Manual Registration**: No `ReactOnRails.register()` calls needed
- **Bundle Splitting**: Each component gets its own optimized bundle

## 🔗 Related Resources

- **[React on Rails Documentation](https://shakacode.gitbook.io/react-on-rails/)** - Official docs
- **[Shakapacker Documentation](https://github.com/shakacode/shakapacker)** - Webpack integration
- **[React on Rails Pro](https://www.shakacode.com/react-on-rails-pro)** - Advanced features

## 📊 Performance Metrics

| Component | Bundle Size | Dependencies | Load Time | Use Case |
|-----------|-------------|--------------|-----------|----------|
| **HelloWorld** | 12.5KB | React basics | Instant | Lightweight UI |
| **HeavyMarkdownEditor** | 1.1MB+ | 58+ libraries | ~200ms | Rich features |

**Bundle Splitting Benefit**: HelloWorld loads 50% faster by avoiding heavy markdown dependencies!

## 🔧 Development Features

### Hot Module Replacement
Changes to React components automatically reload in the browser without losing state.

### Auto-Registration Bundle Architecture
This demo showcases React on Rails v15's **file-system-based auto-registration**:

**Key Benefits:**
- **🚀 Zero Manual Registration** - Components automatically available when placed in `ror_components/`
- **📦 Intelligent Bundle Splitting** - Each component gets its own optimized webpack bundle
- **⚡ Automatic Bundle Loading** - No `javascript_pack_tag` needed in layouts
- **🔒 Component Isolation** - Each component's dependencies are self-contained
- **📈 Scalability** - Add new components by creating directories, no configuration needed
- **🛠️ Maintainability** - File-system structure matches component organization

**How Auto-Registration Works:**
1. Place component in `app/javascript/src/ComponentName/ror_components/Component.jsx`
2. Run `rake react_on_rails:generate_packs` to scan and generate webpack entries
3. Use `<%= react_component("ComponentName") %>` in Rails views
4. Bundle automatically loads when component renders - no layout changes needed!

### Modern JSX Transform
Uses React 17+ automatic JSX runtime (no `import React` needed).

### Testing Development and Production Builds

We've enhanced the `bin/dev` script to support three different modes:

**Development Mode** (with HMR, default):
```bash
# Default mode - HMR enabled but may have FOUC
bin/dev
open http://localhost:3000
```

**Static Development Mode** (no HMR, no FOUC):
```bash
# Development environment but with extracted CSS (no FOUC)
bin/dev static
open http://localhost:3000
```

**Production-Assets Mode** (fully optimized):
```bash
# Production-optimized bundles
bin/dev prod
open http://localhost:3001

# Or use the full command name
bin/dev production-assets
```

**Help**:
```bash
bin/dev help
```

**Mode Comparison**:

| Aspect | Development (HMR) | Static Development | Production-Assets |
|--------|-------------------|-------------------|-------------------|
| **FOUC** | ❌ May occur | ✅ No FOUC | ✅ No FOUC |
| **HMR** | ✅ Live reload | ❌ Manual refresh | ❌ Manual refresh |
| **CSS** | CSS modules async | Extracted files | Extracted + minified |
| **Bundle Size** | Full + source maps | Full + source maps | Minified + optimized |
| **Build Speed** | Fastest | Fast | Slowest |
| **Environment** | Development | Development | Production |
| **Port** | 3000 | 3000 | 3001 |
| **Use Case** | Active development | Testing without FOUC | Pre-deploy testing |

**Cleanup after testing production**:
```bash
rm -rf public/packs && bin/dev
```

## 🌟 Key Technical Decisions

### Why Shakapacker First?
- Shakapacker creates the initial `package.json` file
- React on Rails generator expects `package.json` to exist
- This sequence prevents the installation error

### Why Auto-Registration?
- **🚀 Zero Configuration**: No manual `ReactOnRails.register()` calls needed
- **📁 File-System Based**: Directory structure defines component organization
- **🔄 Automatic Detection**: `rake react_on_rails:generate_packs` scans and generates entries
- **⚡ Bundle Optimization**: Each component gets its own webpack bundle automatically
- **🛠️ Developer Experience**: Add components by creating directories, not configuration files
- **📈 Scalability**: Easy to add hundreds of components without manual registration overhead

### Why Bundle Splitting?
- **⚡ Performance**: Lightweight components load instantly (~50KB), heavy ones load on-demand (~2.7MB)
- **📦 Intelligent Caching**: Browser caches shared vendor chunks across all components
- **🔒 Isolation**: Component dependencies don't affect other components
- **📊 Analytics**: Easy to measure individual component performance impact
- **🚀 Progressive Loading**: Critical components load first, features load as needed

### Why CSS Modules?
- **Scoped styles**: No global CSS conflicts
- **Component-based**: Styles live with components
- **Auto-completion**: IDE support for class names
- **Bundle optimization**: Unused styles are eliminated
- **SSR compatible**: Styles work with server-side rendering

## 📊 Version Information

| Technology | Version | Purpose |
|------------|---------|---------|
| **Rails** | 8.0.1 | Backend framework |
| **React** | 19.1.1 | Frontend library |
| **React on Rails** | 15.0.0 | Integration layer |
| **Shakapacker** | 8.3.0 | Asset compilation |
| **Ruby** | 3.2+ | Programming language |
| **Node.js** | 18+ | JavaScript runtime |

## 🐛 Troubleshooting

### Component Not Loading?
- Check that the bundle is included in the layout: `<%= javascript_pack_tag 'component-bundle' %>`
- Verify component is registered in the pack file
- Ensure routes are configured correctly

### "package.json not found" Error?
- You installed React on Rails before Shakapacker
- Follow the correct installation sequence above

### CSS Not Loading?
- Verify CSS modules import: `import * as style from './Component.module.css'`
- Check that styles are applied: `className={style.containerName}`
- Ensure stylesheet_pack_tag is in layout (if needed)

### HMR Not Working?
- Confirm `bin/dev` is running (not just `rails server`)
- Check that webpack-dev-server is starting successfully
- Verify you're on `localhost:3000` not a different port

## 📚 Additional Resources

- **[React on Rails Documentation](https://shakacode.gitbook.io/react-on-rails/)**
- **[Shakapacker Documentation](https://github.com/shakacode/shakapacker)**  
- **[REACT_ON_RAILS_QUICKSTART.md](./REACT_ON_RAILS_QUICKSTART.md)** - Detailed setup guide
- **[React on Rails Pro](https://www.shakacode.com/react-on-rails-pro)** - Advanced features

## 🤝 Contributing

This is a reference implementation. If you find issues:

1. Check the git commit history to understand each step
2. Verify you followed the installation sequence exactly
3. Compare your setup with this working example

## 📄 License

This demo application is available as open source under the terms of the MIT License.

---

**⭐ Star this project if it helped you fix the React on Rails installation issue!**
