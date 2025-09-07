# React on Rails Auto-Registration Architecture

This demo showcases React on Rails v15's **file-system-based automated bundle generation** with intelligent bundle splitting and SSR support.

## System Architecture

### File-System Based Discovery

React on Rails automatically detects components using a conventional directory structure:

```
app/javascript/src/
├── HelloWorld/ror_components/
│   ├── HelloWorld.jsx              # Lightweight component (10.0KB JS + 2.5KB CSS)
│   └── HelloWorld.module.css       # CSS modules
└── HeavyMarkdownEditor/ror_components/
    ├── HeavyMarkdownEditor.jsx     # Heavy component (26.5KB + 1,081KB libraries)
    └── HeavyMarkdownEditor.module.css
```

### Configuration

**`config/initializers/react_on_rails.rb`:**
```ruby
config.components_subdirectory = "ror_components"
config.auto_load_bundle = true
config.server_bundle_js_file = "server-bundle.js"
```

**`config/shakapacker.yml`:**
```yaml
nested_entries: true  # Enable nested directory scanning
```

### Automated Build Process

1. **`rake react_on_rails:generate_packs`** scans the directory structure
2. **Webpack entries** are automatically generated in `app/javascript/packs/generated/`
3. **Bundle splitting** separates lightweight from heavyweight dependencies
4. **Server bundle** is created for SSR with component registration

## Component Patterns

### Lightweight Components (HelloWorld)

- **Bundle Size**: ~50KB (React basics only)
- **Loading**: Immediate SSR + instant hydration
- **Use Case**: Core UI components, forms, navigation

### Heavy Components (HeavyMarkdownEditor) 

- **Bundle Size**: ~2.7MB (58+ dependencies via react-markdown)
- **Loading**: SSR skeleton → progressive enhancement
- **Use Case**: Rich editors, data visualization, third-party widgets

> 📋 **SSR + Heavy Components**: For detailed implementation patterns, including FOUC prevention and dynamic imports, see [SSR_DYNAMIC_IMPORTS_GUIDE.md](./SSR_DYNAMIC_IMPORTS_GUIDE.md).

## Bundle Splitting Strategy

### Automatic Vendor Splitting

Webpack automatically creates shared vendor chunks:

```
- runtime.js (50KB)           # Webpack runtime
- vendors-react.js (530KB)    # React core (shared)
- vendors-css.js (1.06MB)     # CSS processing (shared) 
- vendors-markdown.js (1.03MB) # Heavy deps (HeavyMarkdownEditor only)
- HelloWorld.js (31KB)        # Component code
- HeavyMarkdownEditor.js (40KB) # Component code
```

### Loading Performance

| Component | Total Size | Network Requests | Load Time |
|-----------|------------|-----------------|-----------|
| HelloWorld | 612KB | 3 chunks | ~100ms |
| HeavyMarkdownEditor | 2.7MB | 5 chunks | ~300ms |

### Caching Benefits

- **Shared vendors** cached across pages
- **Component isolation** - adding HeavyMarkdownEditor doesn't affect HelloWorld
- **Incremental loading** - users only download what they need

## Server-Side Rendering

Both components support SSR with different strategies:

### HelloWorld: Full SSR
```ruby
<%= react_component("HelloWorld", props: @props, prerender: true) %>
```
- Complete server rendering
- Immediate hydration
- Zero client-side loading states

### HeavyMarkdownEditor: Progressive SSR
```ruby  
<%= react_component("HeavyMarkdownEditor", props: @props, prerender: true) %>
```
- Server renders structure + skeleton
- Client progressively enhances with heavy dependencies
- Prevents FOUC with content-aware placeholders

## Development Workflow

### Adding New Components

1. Create directory: `app/javascript/src/NewComponent/ror_components/`
2. Add component: `NewComponent.jsx`
3. Run: `bundle exec rake react_on_rails:generate_packs`
4. Use in views: `<%= react_component("NewComponent") %>`

### Zero Manual Configuration

- No webpack entries to maintain
- No manual `ReactOnRails.register()` calls
- No bundle configuration needed
- Automatic CSS modules support

## Production Considerations

### Performance Optimization

- **Critical components** (HelloWorld) load immediately
- **Enhancement components** (HeavyMarkdownEditor) load progressively
- **Vendor chunks** are cached aggressively
- **Server rendering** provides fast initial paint

### Deployment

The generated packs in `app/javascript/packs/generated/` should be:
- **Committed to git** for deployment consistency
- **Re-generated** when components change
- **Validated** during CI/CD pipeline

### Monitoring

Track bundle sizes and loading performance:
- Monitor chunk sizes in webpack-bundle-analyzer
- Track component hydration times
- Measure cumulative layout shift (CLS) for FOUC prevention

## Scalability

This architecture scales to hundreds of components:

- **Automatic bundling** prevents webpack configuration explosion
- **Intelligent splitting** keeps bundles appropriately sized
- **Progressive loading** maintains performance as complexity grows
- **SSR flexibility** allows per-component optimization strategies

---

## Related Documentation

- **[SSR + Dynamic Imports Guide](./SSR_DYNAMIC_IMPORTS_GUIDE.md)** - Technical deep-dive on handling heavy components with SSR
- **[React on Rails Docs](https://github.com/shakacode/react_on_rails)** - Official documentation for React on Rails gem