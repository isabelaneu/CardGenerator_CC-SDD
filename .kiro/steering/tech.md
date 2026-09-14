# Technology Stack

## Architecture

The front-end is a static single-page application composed of HTML, CSS, and JavaScript. The UI keeps the form, preview card, and export behavior in client-side code without a package manager.

## Core Technologies

- **Language**: HTML, CSS, JavaScript
- **Framework**: None
- **Runtime**: Static browser application

## Key Libraries

No external libraries are required. Browser APIs such as DOM rendering and canvas/image export are used directly.

## Development Standards

### Type Safety

No TypeScript is used in this static HTML project.

### Code Quality

Keep HTML semantic, CSS maintainable, and JavaScript simple and readable. Prefer small reusable functions.

### Testing

Validate layout and interactions manually in a browser or through a lightweight smoke test.

## Development Environment

### Required Tools

A modern browser and a local static file server are sufficient.

### Common Commands
```bash
# Dev: open index.html directly or serve the folder locally
# Build: none
# Test: open the page and verify form, preview, and export behavior
```

## Key Technical Decisions

The project should stay dependency-free to match the assignment and use direct DOM and canvas APIs for the image export flow.

---
_Document standards and patterns, not every dependency_
