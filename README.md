# Michigan Online Canvas CSS

This project includes the main assets and build pipeline for handling the Michigan Online Canvas CSS. It provides a way to manage the shared stylesheet using a Github-centric delivery model. The intention is that experimentation can happen on branches, but when changes are ready to be deployed publicly, they are merged to the `main` branch, at which point a build occurs and replaces the publicly available assets.

[LESS](https://lesscss.org/) is used as the preprocessor for CSS production.

## Setting up and running this project

### Required dependencies

This project requires Node.js. It is currently using version 24 (LTS) for builds.

### Installation of javascript tools

Once a suitable version of Node.js is available on your local device, install the javascript dependencies with

```shell
$ npm install
```

### Running a local dev server

For convenience, the project relies on some open source libraries for serving files and watching for changes.

```shell
$ npm run dev
```

Ths will trigger a few background processes. When changes are detected to the `src` filesystem, the LESS is re-processed, and a page in the browser is automatically reloaded.

After initial startup, a browser window/tab will automatically open with the contents of `demo/index.html`.

Once you are finished with the current development process, you can exit the supporting tooling by using <kbd>cntl</kbd> + <kbd>c</kbd> within the terminal that you used to start the dev server.

## Creating CSS

### Referring to assets outside of the LESS file

When referring to assets (e.g. images, or icons), you can do so with relative paths to `url()` constructs. E.g.

```css
.logo {
    background-image: url("../assets/icons/um-logo.png");
}
```

Since the output CSS is built to a folder that is in the same relative position as the base less file, all references should build off of that top-level path. This means that the paths should be relative to `canvas-style.less`, rather than the LESS file itself. There is currently no URL rewriting.

### Creating other HTML mockups

Any HTML file in `demo` should be available to the dev server, and support automatic page reloading. Creating a new HTML file in this folder should make it available. As a convenience, adding a hyperlink to `demo/index.html` would be wise.

### What if I want to create _another_ stylesheet

Right now, the project only watches and builds a single LESS file. This is defined with the `build:css` script found in `package.json`. One could modify this script to support multiple LESS files to compile.

## Build process

When the project is built, the main `canvas-style.less` file is compiled to css. All assets are then copied over, along with the compiled CSS, to the `sites` directory. This directory is explicitly _excluded_ from version control.

### Git workflow

#### Create a new branch

When adjusting styles, create a new git branch that you will work with. Any changes you make may be committed to this branch, and pushed to the central repository. Changes made to branches outside of `main` will not impact the publicly available style assets.

#### Open a Pull Request

Pull requests from your new branch on to `main` will allow others to see what changes you have made, and provide any suggestions for changes before publication.

#### Merge the Pull Request

Once a pull request is merged to `main`, the Github Pages processing will happen, and release a new version of the now published assets.

