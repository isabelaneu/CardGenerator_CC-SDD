# Project Structure

## Organization Philosophy

The project follows a simple static front-end structure where HTML, CSS, and JavaScript cooperate in one page and one visual layout.

## Directory Patterns

### Static Assets
**Location**: `/assets/`  
**Purpose**: Store images or shared static resources that the UI uses.  
**Example**: Brand logos or decorative icons.

### Styles
**Location**: `/styles/`  
**Purpose**: Keep visual rules and layout styling separated from markup.  
**Example**: `styles.css`.

### JavaScript
**Location**: `/script.js`  
**Purpose**: Manage form data, card preview updates, and image export behavior.  
**Example**: DOM event listeners and rendering helpers.

## Naming Conventions

- **Files**: kebab-case or descriptive lowercase names
- **Components**: UI sections expressed as semantic HTML elements and reusable class names
- **Functions**: descriptive camelCase names

## Import Organization

```javascript
// Example import patterns
import { updatePreview } from './script.js'
```

**Path Aliases**:
- `@/`: not required in a static HTML project

## Code Organization Principles

- Keep markup, styling, and JavaScript separate.
- Prefer direct DOM manipulation over heavy abstractions.
- Keep functions focused on single responsibilities such as form reading, formatting, and export.

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_
