# SSR + Dynamic Imports: Solving the FOUC Problem

## The Challenge

When using React on Rails with **Server-Side Rendering (SSR)** and **heavy client-side dependencies**, you encounter a classic web performance problem: **Flash of Unstyled Content (FOUC)**. This manifests as a jarring visual transition where users see placeholder content that suddenly shifts to fully rendered content.

### Root Cause

Heavy JavaScript libraries (like `react-markdown` with 58+ dependencies) cannot run during server-side rendering because they:

1. **Access browser APIs** (`document`, `window`) not available on the server
2. **Have large bundle sizes** that would slow down SSR
3. **Require dynamic loading** for optimal performance

## The Solution Pattern

We implemented a **Skeleton Loader + Dynamic Import** pattern that provides seamless SSR with progressive enhancement.

### Architecture Overview

```javascript
// ❌ PROBLEMATIC: Direct imports cause SSR errors
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ✅ SOLUTION: Dynamic imports + skeleton loader
const [MarkdownComponent, setMarkdownComponent] = useState(null);

useEffect(() => {
  const loadMarkdown = async () => {
    const [{ default: ReactMarkdown }, { default: remarkGfm }] = await Promise.all([
      import('react-markdown'),
      import('remark-gfm')
    ]);
    
    const Component = ({ children }) => (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    );
    
    setMarkdownComponent(() => Component);
    setIsClient(true);
  };

  loadMarkdown();
}, []);
```

### Preventing FOUC with Skeleton Loaders

Instead of showing a simple "Loading..." message, we create **content-aware skeleton loaders** that:

1. **Match final content dimensions** to prevent layout shift
2. **Animate smoothly** to indicate loading state  
3. **Preserve visual hierarchy** (titles, paragraphs, code blocks, tables)

```jsx
const SkeletonLoader = () => (
  <div className={style.skeleton}>
    {/* Title placeholder */}
    <div className={style.skeletonTitle}></div>
    
    {/* Paragraph placeholders */}
    <div className={style.skeletonParagraph}></div>
    <div className={`${style.skeletonParagraph} ${style.skeletonMedium}`}></div>
    
    {/* Code block placeholder */}
    <div className={style.skeletonCode}></div>
    
    {/* Table placeholder */}
    <div className={style.skeletonTable}></div>
  </div>
);

// Render logic with smooth transitions
{isClient && MarkdownComponent ? (
  <div className={`${style.contentTransition} ${style.fadeIn}`}>
    <MarkdownComponent>{markdown}</MarkdownComponent>
  </div>
) : (
  <SkeletonLoader />
)}
```

### CSS Animation System

```css
/* Skeleton loader animations */
.skeleton {
  animation: pulse 1.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% { opacity: 1; }
  100% { opacity: 0.6; }
}

/* Smooth content transitions */
.contentTransition {
  transition: opacity 0.3s ease-in-out;
}

.fadeIn { opacity: 1; }
.fadeOut { opacity: 0; }
```

## Implementation Benefits

### ✅ **Performance**
- **Fast initial page load** - SSR renders structure immediately
- **Progressive enhancement** - Heavy deps load after critical content
- **Bundle splitting** - Maintains intelligent code separation

### ✅ **User Experience**  
- **No layout shift** - Skeleton matches content dimensions
- **Smooth transitions** - Fade animations provide polish
- **Perceived performance** - Users see structure immediately

### ✅ **SEO & Accessibility**
- **Server-rendered HTML** - Search engines see content structure
- **Graceful degradation** - Works without JavaScript
- **Screen reader friendly** - Semantic HTML preserved

## Common Pitfalls & Solutions

### ❌ **Pitfall**: Simple loading messages cause layout shift
```jsx
// Bad: causes FOUC
{loading ? <div>Loading...</div> : <HeavyContent />}
```

### ✅ **Solution**: Dimensional skeleton loaders
```jsx
// Good: preserves layout
{loading ? <SkeletonLoader /> : <HeavyContent />}
```

### ❌ **Pitfall**: Importing heavy libs at module level
```jsx
// Bad: breaks SSR
import HeavyLibrary from 'heavy-library';
```

### ✅ **Solution**: Dynamic imports in useEffect
```jsx
// Good: SSR-safe
useEffect(() => {
  import('heavy-library').then(lib => setLib(lib));
}, []);
```

## When to Use This Pattern

✅ **Use for:**
- Heavy third-party libraries (markdown renderers, charts, editors)
- Browser-specific APIs or polyfills
- Components with large dependency trees
- Features that enhance but aren't critical

❌ **Don't use for:**
- Core application functionality
- Small, lightweight components  
- Libraries that support SSR natively
- Components needed for initial page structure

## Testing Your Implementation

1. **Disable JavaScript** - Page should render with skeleton
2. **Slow network simulation** - Skeleton should appear immediately
3. **Fast network** - Transition should be smooth
4. **Screen reader testing** - Structure should be accessible

## Real-World Results

In our React on Rails demo:

- **HelloWorld**: 50KB, immediate SSR ✅
- **HeavyMarkdownEditor**: 2.7MB, SSR + skeleton → smooth transition ✅
- **Bundle splitting**: Maintained across both approaches ✅
- **FOUC eliminated**: No layout shift during loading ✅

This pattern is essential for modern React applications that need to balance initial load performance with rich interactive features.