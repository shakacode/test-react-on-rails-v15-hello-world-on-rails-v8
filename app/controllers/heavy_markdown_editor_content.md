# React on Rails Auto-Bundle Generation 🚀

This **Heavy Markdown Editor** demonstrates React on Rails' intelligent **bundle splitting** capabilities with file-system-based automated bundle generation.

> **Note**: In a real application, this content would typically come from a database record (e.g., `Article.find(params[:id]).content`) or a CMS. This demo uses a static file for simplicity.

## 🎯 What Makes This "Heavy"?

This component includes:
- **React Markdown** (~500KB parsed bundle)
- **Remark GFM** (GitHub Flavored Markdown)  
- **58+ transitive dependencies**
- Real-time preview rendering
- Syntax highlighting support

Compare this to the lightweight HelloWorld component that loads only React basics!

## 🏗️ Auto-Registration Architecture

React on Rails v15 automatically detects components in:

```
app/javascript/src/ComponentName/ror_components/
├── Component.jsx       # Your React component
└── Component.module.css # CSS modules (optional)
```

### Bundle Generation Process

1. **Detection**: `rake react_on_rails:generate_packs` scans directories
2. **Entry Creation**: Generates webpack entries in `packs/generated/`
3. **Smart Splitting**: Webpack separates heavy dependencies
4. **Lazy Loading**: Only loads bundles when components are rendered

## 🔬 Bundle Analysis

| Component | Bundle Size | Network Impact | Load Time |
|-----------|-------------|----------------|-----------|
| HelloWorld | ~50KB | Minimal | Instant |  
| **HeavyMarkdownEditor** | **~2.7MB** | **Heavy** | **200ms+** |
| Total Vendor Chunks | ~2.6MB | Shared | Cached |

## ✅ Smart Splitting Benefits

- [x] **Code Splitting**: Heavy deps only load when needed
- [x] **Bundle Caching**: Shared vendor chunks cached across pages  
- [x] **Performance**: Initial page loads stay fast
- [x] **Scalability**: Add components without bloating main bundle
- [x] **Developer Experience**: Zero manual webpack configuration

## 🎨 Try It Yourself!

**Edit this markdown** ← and watch the live preview update instantly!

### Supported Markdown Features:

- **Bold** and *italic* text
- `inline code` and code blocks
- Tables with alignment
- Task lists with checkboxes
- ~~Strikethrough text~~
- > Blockquotes for emphasis
- Links and images
- Headers (H1-H6)

### Code Example
```javascript
// React on Rails auto-registration
// No manual ReactOnRails.register() needed!

const config = {
  components_subdirectory: "ror_components",
  auto_load_bundle: true,
  server_bundle_js_file: "server-bundle.js"
};

// Webpack automatically creates entries for:
// app/javascript/src/*/ror_components/*.jsx
```

### Database Integration Example

```ruby
# In a real application, content would come from database:
class HeavyMarkdownEditorController < ApplicationController
  def index
    # Example: Load from database
    @article = Article.find(params[:id] || 1)
    @heavy_markdown_editor_props = {
      initialText: @article.content,
      title: @article.title,
      author: @article.author.name,
      lastModified: @article.updated_at
    }
  end
end

# Database schema example:
# articles: id, title, content:text, author_id, created_at, updated_at
# authors: id, name, email
```

> **💡 Pro Tip:** This architecture scales beautifully - add more components and React on Rails automatically handles the bundling complexity for you!

---

**🚀 Ready to explore?** Try navigating between components to see bundle splitting in action!