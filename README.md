# Rossella Ferrandino Portfolio

Personal portfolio, blog, and notes site built with Eleventy and deployed to GitHub Pages.

## Requirements

- Node.js 24 or newer
- npm

## Local development

Install dependencies:

```bash
npm ci
```

Start Eleventy in watch mode:

```bash
npm start
```

The local site is available at `http://localhost:8081/`.

## Production build

Generate the static site in `_site`:

```bash
npm run build
```

The `_site` directory is generated output and should not be edited or committed.

## Adding a note

Create a Markdown file in `notes/` with front matter and the shared note layout:

```markdown
---
layout: layouts/note.njk
title: A new note
description: A short description of the note.
label: Personal note
permalink: /notes/a-new-note/
image: /assets/example.jpg
imageWidth: 1200
imageHeight: 800
imageAlt: Description of the image
---

Note content goes here.
```

Add the new note to `notes.html` so it appears in the notes archive.

Shared site chrome lives in `_includes/header.njk` and `_includes/footer.njk`. The note page structure is in `_includes/layouts/note.njk`.

## Deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys `_site` whenever changes are pushed to `main`. It can also be started manually from the GitHub Actions tab.

In the repository settings, set **Pages → Source** to **GitHub Actions**.
