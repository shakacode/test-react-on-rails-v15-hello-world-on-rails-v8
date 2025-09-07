import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as style from './HeavyMarkdownEditor.module.css';

const HeavyMarkdownEditor = (props) => {
  const [markdown, setMarkdown] = useState(props.initialText || `# Welcome to Heavy Markdown Editor! 📝

This component demonstrates **bundle splitting** with a heavy dependency.

## Features Loaded:
- React Markdown (58 dependencies!)
- GitHub Flavored Markdown
- Syntax highlighting support
- Tables, strikethrough, task lists

## Try editing this text:

### Task List
- [x] Load heavyweight markdown library
- [x] Demonstrate bundle splitting
- [ ] Edit this text and see live preview!

### Code Example
\`\`\`javascript
const demo = "This shows how bundles can be split!";
console.log(demo);
\`\`\`

### Table
| Component | Bundle Size | Dependencies |
|-----------|-------------|--------------|
| HelloWorld | Small | Minimal |
| HeavyMarkdownEditor | **Large** | 58+ packages |

**Edit the text on the left to see the live preview! →**`);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Heavy Markdown Editor</h2>
        <p className={style.subtitle}>
          Demonstrates bundle splitting - this component loads 58+ dependencies!
        </p>
      </div>
      
      <div className={style.editorContainer}>
        <div className={style.inputPanel}>
          <h3 className={style.panelTitle}>📝 Edit Markdown</h3>
          <textarea
            className={style.textarea}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter your markdown here..."
          />
        </div>
        
        <div className={style.previewPanel}>
          <h3 className={style.panelTitle}>👁️ Live Preview</h3>
          <div className={style.preview}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className={style.navigation}>
        <a href="/hello_world" className={style.link}>
          ← Back to Lightweight HelloWorld
        </a>
        <div className={style.bundleInfo}>
          <strong>Bundle Impact:</strong> This component adds ~200KB+ to the JavaScript bundle
        </div>
      </div>
    </div>
  );
};

export default HeavyMarkdownEditor;