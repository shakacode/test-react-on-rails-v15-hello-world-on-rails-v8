# React on Rails Hello World Demo 🚀

A complete demonstration of React on Rails 15.0 with Rails 8, showcasing the **corrected installation sequence** that fixes the infamous "package.json not found" error.

![React on Rails](https://img.shields.io/badge/React%20on%20Rails-15.0-blue)
![Rails](https://img.shields.io/badge/Rails-8.0.1-red)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB)
![Shakapacker](https://img.shields.io/badge/Shakapacker-8.3.0-green)

## 🎯 What This Demo Solves

This sample application demonstrates the **critical fix** for the React on Rails installation issue where generators would fail with:

```bash
ERROR: package.json not found
```

**The Solution:** Install Shakapacker BEFORE React on Rails, not after.

## ✨ Features Demonstrated

- ✅ **Correct Installation Sequence** - Shakapacker first, then React on Rails
- ✅ **Component Auto-Registration** - No manual ReactOnRails.register() calls needed
- ✅ **Multiple Components** - HelloWorld and SecondComponent with navigation
- ✅ **Modern React Patterns** - Hooks, functional components, CSS modules
- ✅ **Hot Module Replacement** - Live reloading during development
- ✅ **Professional Styling** - Gradient backgrounds, glassmorphism effects
- ✅ **Bundle Separation** - Each component has its own webpack pack

## 🚀 Quick Start

### Prerequisites

- Ruby 3.2+ 
- Node.js 18+ 
- Yarn 1.22+

### Installation

```bash
# Clone or navigate to this directory
cd test-react-on-rails-v15-hello-world-on-rails-v8

# Install dependencies
bundle install
yarn install

# Start development server (Rails + Webpack)
bin/dev
```

### 🌐 Try the Demo

Open your browser to:
- **http://localhost:3000/** - HelloWorld component (root path)
- **http://localhost:3000/hello_world** - Same HelloWorld component
- **http://localhost:3000/second_component** - SecondComponent demo

## 🏗️ Architecture Overview

### File Structure
```
app/
├── controllers/
│   ├── hello_world_controller.rb          # Rails controller for HelloWorld
│   └── second_component_controller.rb     # Rails controller for SecondComponent
├── javascript/
│   ├── bundles/                           # React components organized by feature
│   │   ├── HelloWorld/
│   │   │   └── components/
│   │   │       ├── HelloWorld.jsx         # Main React component
│   │   │       ├── HelloWorld.module.css  # CSS modules styling
│   │   │       └── HelloWorldServer.js    # Server-side rendering export
│   │   └── SecondComponent/
│   │       └── components/
│   │           ├── SecondComponent.jsx
│   │           ├── SecondComponent.module.css
│   │           └── SecondComponentServer.js
│   └── packs/                             # Webpack entry points
│       ├── hello-world-bundle.js          # Bundle for HelloWorld
│       ├── second-component-bundle.js     # Bundle for SecondComponent
│       ├── server-bundle.js               # Server-side rendering bundle
│       └── application.js                 # Main application bundle
└── views/
    ├── hello_world/
    │   └── index.html.erb                 # Rails view template
    ├── second_component/
    │   └── index.html.erb
    └── layouts/
        ├── hello_world.html.erb           # Layout with hello-world-bundle
        └── second_component.html.erb      # Layout with second-component-bundle
```

### Component Registration Pattern

Each component follows the same registration pattern:

**Pack File (`hello-world-bundle.js`):**
```javascript
import ReactOnRails from 'react-on-rails';
import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';

ReactOnRails.register({
  HelloWorld,
});
```

**Rails View (`index.html.erb`):**
```erb
<%= react_component("HelloWorld", props: { name: "Stranger" }, prerender: false) %>
```

**Layout (`hello_world.html.erb`):**
```erb
<%= javascript_pack_tag 'hello-world-bundle' %>
```

## 📋 The Critical Installation Sequence

### ❌ Wrong Way (Causes Errors)
```bash
rails new my_app
bundle add react-on-rails          # ERROR: No package.json!
rails generate react_on_rails:install
```

### ✅ Correct Way (This Demo)
```bash
# 1. Create Rails app
rails new my_app --skip-jbuilder
cd my_app

# 2. Add Shakapacker FIRST (creates package.json)
bundle add shakapacker
rails generate shakapacker:install

# 3. THEN add React on Rails (package.json now exists)
bundle add react-on-rails  
rails generate react_on_rails:install --node-name=hello-world

# 4. Install JavaScript dependencies
yarn install

# 5. Generate components and run
rails generate react_on_rails:component HelloWorld
bin/dev
```

## 🎨 Modern React Features

### Functional Components with Hooks
```jsx
import React, { useState } from 'react';
import * as style from './HelloWorld.module.css';

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);
  
  return (
    <div className={style.container}>
      <h1 className={style.title}>Hello, {name}!</h1>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        className={style.input}
      />
    </div>
  );
};

export default HelloWorld;
```

### CSS Modules with Modern Styling
```css
/* HelloWorld.module.css */
.container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.input:focus {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

## 🔧 Development Features

### Hot Module Replacement
Changes to React components automatically reload in the browser without losing state.

### Bundle Separation  
Each component has its own webpack bundle, allowing for:
- Independent loading
- Code splitting
- Optimized caching
- Modular architecture

### Modern JSX Transform
Uses React 17+ automatic JSX runtime (no `import React` needed).

## 🌟 Key Technical Decisions

### Why Shakapacker First?
- Shakapacker creates the initial `package.json` file
- React on Rails generator expects `package.json` to exist
- This sequence prevents the installation error

### Why Separate Bundles?
- **Modularity**: Each component is self-contained
- **Performance**: Load only what's needed per page
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new components

### Why CSS Modules?
- **Scoped styles**: No global CSS conflicts
- **Component-based**: Styles live with components
- **TypeScript support**: Auto-completion for class names
- **Bundle optimization**: Unused styles are eliminated

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
