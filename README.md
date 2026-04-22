# Michigan Online Canvas CSS

This repository manages the shared stylesheet for Michigan Online's Canvas courses and hosts the **cookbook** — a reference site for content authors who build course pages.

- **The stylesheet** is a single CSS file compiled from LESS source. Every course that imports it automatically receives updates whenever a change is merged to `main`. No per-course editing is needed.
- **The cookbook** is a set of HTML reference pages showing content authors what markup to write and what it looks like rendered with the live styles.

---

## For content authors

The cookbook is published at:

- **Production (stable):** `https://academic-innovation.github.io/canvas-css/cookbook/`
- **Staging (preview of unreleased changes):** `https://academic-innovation.github.io/canvas-css/staging/cookbook/`

You do not need to touch this repository. Head to the production cookbook to find copy-paste snippets for your course pages.

---

## For designers

### What you need first

- **Node.js 22 (LTS)** or later — download from [nodejs.org](https://nodejs.org)
- **Git** — to clone the repository and manage branches
- A code editor (VS Code works well)

### Install dependencies

Clone the repository, then run this once inside the project folder:

```shell
npm install
```

### Start the local dev server

```shell
npm run dev
```

A browser tab opens automatically at `http://localhost:5173` showing the cookbook. This is your live preview environment.

While the dev server is running:

- Edit `src/less/canvas-style.less` and the styles update in the browser instantly, without a full page reload.
- The component preview tiles on the HTML Elements and New Canvas pages also refresh automatically to show your changes.
- Add or edit cookbook pages in the `cookbook/` folder and they appear immediately.

Press <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal to stop the server when you're done.

---

## Making changes

### Editing styles

All styles live in `src/less/canvas-style.less`. This is a [LESS](https://lesscss.org/) file — a superset of CSS that adds variables, nesting, and mixins. If you know CSS, the syntax will feel familiar.

Images and other assets referenced by the stylesheet should be placed in `src/assets/` and referenced with a path relative to the LESS file, for example:

```css
.logo {
  background-image: url('../assets/logo.svg');
}
```

### Updating the cookbook

When you change a component's styles, update the corresponding cookbook page in the same pull request. Reviewers check both together.

Each cookbook page is a plain HTML file in `cookbook/`. Adding a new file there makes it automatically available in the dev server and in the build — no configuration needed.

---

## Branching and publishing

Changes follow a two-step path to production.

```
feature/your-branch  →  develop  →  main
```

### 1. Create a feature branch

Make a new branch from `develop` for your work. Name it something descriptive, e.g. `feature/update-callout-styles`.

### 2. Open a pull request to `develop`

Push your branch and open a pull request targeting `develop`. A build check runs automatically — the PR cannot be merged until it passes. At least one reviewer must approve.

Once merged, your changes deploy automatically to **staging**:
- Stylesheet: `https://academic-innovation.github.io/canvas-css/staging/canvas-style.css`
- Cookbook: `https://academic-innovation.github.io/canvas-css/staging/cookbook/`

Use the staging cookbook to verify everything looks correct with the real deployed CSS before going to production.

### 3. Open a pull request from `develop` to `main`

When staged changes are ready to go live, open a PR from `develop` into `main`. Again, one approval is required and the build check must pass.

Once merged, changes deploy automatically to **production**:
- Stylesheet: `https://academic-innovation.github.io/canvas-css/dist/canvas-style.css`
- Cookbook: `https://academic-innovation.github.io/canvas-css/cookbook/`

All Canvas courses importing the stylesheet pick up the change immediately — no action needed on individual courses.

> **Note:** Never push directly to `develop` or `main`. All changes go through pull requests.
