# React on Rails Quick Start - Rails 8 + React + Shakapacker

This documentation shows how to create a React on Rails application using the **corrected installation sequence** that fixes the "package.json not found" error.

## Overview

This sample app demonstrates:
- ✅ **Correct installation order**: Shakapacker first, then React on Rails  
- ✅ **Rails 8.0.1** with **React 19.1.1** and **React on Rails 15.0.0**
- ✅ **Shakapacker 8.3.0** (the maintained fork of Webpacker)
- ✅ **Component auto-registration** with separate bundles
- ✅ **Modern React patterns** with hooks and CSS modules
- ✅ **Git commit history** documenting each step

## Critical Installation Sequence

⚠️ **Important**: Install Shakapacker BEFORE React on Rails to avoid package.json errors.

### The Correct Sequence

```bash
# 1. Create new Rails 8 app
rails new my_app --skip-jbuilder
cd my_app

# 2. Add Shakapacker FIRST (this creates package.json)
bundle add shakapacker
bundle exec rails generate shakapacker:install

# 3. Then add React on Rails (now package.json exists)
bundle add react-on-rails
bundle exec rails generate react_on_rails:install --node-name=hello-world

# 4. Install dependencies with yarn (Shakapacker's default)
yarn install

# 5. Generate components and run
bundle exec rails generate react_on_rails:component HelloWorld
bin/dev
```

### Why This Order Matters

- **Shakapacker** creates `package.json` and sets up the JavaScript build pipeline
- **React on Rails** generator expects `package.json` to exist when adding React dependencies
- **Wrong order** causes: `ERROR: package.json not found`

## Generated File Structure

```
app/
├── controllers/
│   ├── hello_world_controller.rb
│   └── second_component_controller.rb
├── javascript/
│   ├── bundles/
│   │   ├── HelloWorld/
│   │   │   └── components/
│   │   │       ├── HelloWorld.jsx
│   │   │       ├── HelloWorld.module.css
│   │   │       └── HelloWorldServer.js
│   │   └── SecondComponent/
│   │       └── components/
│   │           ├── SecondComponent.jsx
│   │           ├── SecondComponent.module.css
│   │           └── SecondComponentServer.js
│   └── packs/
│       ├── application.js
│       ├── hello-world-bundle.js
│       ├── second-component-bundle.js
│       └── server-bundle.js
└── views/
    ├── hello_world/
    │   └── index.html.erb
    ├── second_component/
    │   └── index.html.erb
    └── layouts/
        ├── hello_world.html.erb
        └── second_component.html.erb
```

## Component Auto-Registration Demo

This app demonstrates React on Rails' auto-registration feature with two components:

### HelloWorld Component (`/` and `/hello_world`)
- Interactive name input with React state
- Navigation link to SecondComponent
- CSS modules for styling
- Demonstrates basic React on Rails integration

### SecondComponent (`/second_component`)
- Separate bundle demonstrating component isolation
- Enhanced styling with hover effects
- Navigation back to HelloWorld
- Shows how multiple components work independently

### Bundle Configuration

Each component has its own bundle:

**hello-world-bundle.js:**
```javascript
import ReactOnRails from 'react-on-rails';
import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';

ReactOnRails.register({
  HelloWorld,
});
```

**second-component-bundle.js:**
```javascript
import ReactOnRails from 'react-on-rails';
import SecondComponent from '../bundles/SecondComponent/components/SecondComponent';

ReactOnRails.register({
  SecondComponent,
});
```

## Rails Integration

### Controller Pattern
```ruby
class HelloWorldController < ApplicationController
  def index
    @hello_world_props = { name: "Stranger" }
  end
end
```

### View Pattern
```erb
<%= react_component("HelloWorld", props: @hello_world_props, prerender: false) %>
```

### Layout with Bundle Loading
```erb
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
    <%= javascript_pack_tag "hello-world-bundle" %>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

### Routes Configuration
```ruby
Rails.application.routes.draw do
  root "hello_world#index"
  get 'hello_world', to: 'hello_world#index'  
  get 'second_component', to: 'second_component#index'
end
```

## Modern React Patterns

### Functional Components with Hooks
```jsx
import React, { useState } from 'react';
import styles from './HelloWorld.module.css';

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);
  
  return (
    <div>
      <h3>Hello, {name}!</h3>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
};

export default HelloWorld;
```

### CSS Modules
```css
/* HelloWorld.module.css */
.bright {
  color: red;
  font-weight: bold;
}
```

## Key Concepts Demonstrated

1. **Proper Installation Sequence**: Shakapacker → React on Rails
2. **Component Auto-Registration**: No manual ReactOnRails.register calls needed
3. **Bundle Separation**: Each component has its own JavaScript pack
4. **Modern React**: Hooks, functional components, CSS modules
5. **Rails Integration**: Controllers, views, layouts working together
6. **Navigation**: Component-to-component routing via Rails routes

## Running the Application

```bash
# Development server (both Rails and Webpack)
bin/dev

# Access the application
open http://localhost:5000
```

## Git Commit History

This repository's commits document each step:

1. **Initial commit**: Rails 8 + React on Rails 15.0 + Shakapacker 8.3 hello world app
2. **Switch to yarn**: Remove npm lockfile, use yarn (Shakapacker default)  
3. **Root redirect**: Add root path redirect to hello_world
4. **Second component**: Create SecondComponent to demonstrate auto-registration
5. **Navigation**: Add navigation link between components

## Testing the Fix

You can verify the installation sequence works by:

1. Following this exact sequence on a fresh Rails 8 app
2. Confirming no "package.json not found" errors occur
3. Running the app and seeing both components work
4. Checking that auto-registration loads components properly

## Common Issues & Solutions

### "package.json not found" Error
- **Cause**: Installing React on Rails before Shakapacker
- **Solution**: Install Shakapacker first to create package.json

### Component Not Loading
- **Check**: Ensure bundle is included in layout via `javascript_pack_tag`
- **Check**: Component is registered in the corresponding pack file
- **Check**: Routes are configured correctly

### Webpack Compilation Errors  
- **Check**: yarn.lock exists (not package-lock.json)
- **Check**: All dependencies are installed via `yarn install`
- **Check**: Babel configuration is present in package.json

## AI Agent Instructions

To recreate this app, an AI agent should:

1. **Follow the exact installation sequence** documented here
2. **Use yarn, not npm** for consistency with Shakapacker
3. **Create separate bundles** for each component to demonstrate isolation
4. **Include navigation** between components to show routing
5. **Add proper styling** to make the demo visually appealing
6. **Document each step** with meaningful git commits
7. **Test the final result** to ensure everything works

This approach creates a robust sample that demonstrates both the technical fix and best practices for React on Rails development.