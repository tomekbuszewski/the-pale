---
slug: 2024-08-13-design-systems-in-react-scaffolding-and-setup-part-0
title: Design Systems in React – Scaffolding and Setup (Part 0)
summary:
  Creating and maintaining UI library or an entire design system is complex.
  Building one from scratch can be a challenge, so let’s prepare the project to
  make it easier.
pubdate: 2024-08-13
tags: react, design-system, tailwind
youtube: https://youtu.be/VTiVsxkvG0Q
---

Creating and maintaining UI library or an entire design system is complex.
Building one from scratch can be a challenge, so let’s prepare the project to
make it easier.

Hi, my name is Tomasz and I am a former manager and tech lead. Today I want to
show you how to prepare proper scaffolding for a design system development
environment.

Before we start, let’s lay some ground rules:

- This is part zero of a larger series, in which we will explore the whole topic
  of developing a design system, from development environment (we are here),
  through tokens and grouping, to even testing the components.
- I picked React, but this architecture is viable for every other library. I am
  not using any particular features that only React has.
- I am using Tailwind due to its great customization options paired with tons of
  ready-made code, but this is entirely optional. Vanilla CSS or any other
  framework works perfectly fine.
- In the upcoming parts, I will be using Atomic Design methodology by
  [Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/). I find it
  the most scalable solution as of yet for mid to large systems.
- This is _not_ a design tutorial. I won’t go into details on how things should
  **look** with each other, but I will dive into how they should **work** with
  each other.

All right, let’s start writing some code!

## Bootstrapping and Storybook

We start by creating a new project using Vite:

```bash
~ npm create vite@latest react-design-system -- --template react-ts
```

This will create a new directory called `react-design-system` in which we will
find all the required things to start. After the process is completed, we need
to install the dependencies:

```bash
~ cd react-design-system
~ npm i
```

Just to be sure, let’s run the development command:

```bash
~ npm run dev
```

Works! Great. Now let’s start with the actual environment.

First off, Storybook. It’s the golden standard for developing UI, and supports
many libraries out of the box, including React, Vue, Angular and Svelte. So, in
our main directory:

```bash
~ npx storybook@latest init
```

Historically, Storybook was bundled by Webpack, and it is still supported. But
it also support Vite, both out of the box. As you can see, the installer itself
decided what to use, so that’s all we had to do!

One thing is that Storybook collects some telemetry. If you’re fine with this,
that’s completely fine, but if you want to opt out, go to `./.storybook/main.ts`
and add

```ts
core: {
  disableTelemetry: true,
},
```

to the `config` object.

Installing Storybook today is as seamless as can be. I still remember how
problematic it could be back in the late 2010s, when Webpack came with tons of
config and you had to adjust every bit of it for your app and Storybook’s just
to make it render the same.

## Adding Tailwind

The next step is to add Tailwind. Tailwind is pretty seamless to add to the
project, so let’s start.

First, we need to install the library and its dependencies:

```bash
~ npm i -D tailwindcss postcss autoprefixer
```

After this ends, we can initialize it:

```bash
~ npx tailwindcss init -p
```

By adding `-p` flag, the wizard will also create PostCSS config that will then
utilize `autoprefixer`.

Right, so let’s configure Tailwind to see our files. In the config file
(`tailwind.config.js`), set `config` property to:

```ts
content: ["./index.html", "./src/**/*.{ts,tsx}"],
```

This will make Tailwind scan aforementioned files.

Now create `style.css` file in `./src` and put the basics:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

And import the file in `main.tsx`:

```tsx
// ./src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

That’s it for the app. We can run the dev mode and see if it works.

But that’s not everything. Storybook doesn’t know we want to use Tailwind and
won’t see it. Luckily, this is an easy fix. Go to `./storybook/preview.ts` and
import the CSS file we’ve made earlier:

```ts
import "../src/style.css";
```

That’s it!

## Adding linters

One of the most crucial things in development is code style. I know it sounds
funny and you might think I am overreacting, but fighting over spaces, quotes
and line lengths can often balloon and become a real problem. A good way to
solve the issue early is to throw Prettier and ESLint in. Let’s do it now.

```bash
~ npm i prettier -D
```

This will add the `prettier` package to our project. We need to configure it, so
let’s create the config file:

```ts
/**
 * @type {import("prettier").Config}
 */
export default {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
};
```

I like to have this as a standard: always add semicolons, use double quotes, use
two spaces and add trailing commas to all elements.

While Prettier can work as a command line utility, I strongly suggest
configuring your IDE to reformat the file on save. In IntelliJ this is done via
Settings > Languages & Frameworks > JavaScript > Prettier, and in there, pick
"Automatic Prettier Configuration" and check "Run on Save".

To start fresh and have all the files formatted correctly, go into terminal and
run

```bash
~ prettier -w ./*
```

This will reformat and write (hence the `-w` flag) all files in the project.

As for ESLint, Vite adds it automatically, and with decent settings to boot. For
the sake of brevity, I will leave it as-is. You can, obviously, modify it to
your needs and make it as lax or as strict as you want. One thing to remember
here is that, by default, ESLint uses its new “flat” config, and some plugins
aren’t compatible. There’s `FlatCompat` class exposed by `@eslint/eslintrc`, but
I had mixed results with it.

## Defining our first component

If all is configured, let’s get to work. There’s `stories` directory created by
Storybook which serves as an example repository. You can keep it, be we won’t be
using it. We’ll create another “space” for the UI, named, well, `ui`. From
there, we will export all the public components to use across the app.

I like to have a global export file in every space, and with that, a shortcut
defined in `tsconfig.json`. Something like

```
@path/* -> ./src/path/*
@path -> ./src/path/index.tsx
```

I won’t dive into Atomic Design today to save time, so let’s just create a basic
component in the UI space to get it going!

```tsx
// ./ui/Info/Info.tsx

import type { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "error";
}

export default function Info({ className, children, variant = "info" }: Props) {
  const cls: string[] = [className || ""];

  switch (variant) {
    case "warning": {
      cls.push("bg-yellow-100 text-yellow-800 border-yellow-500");
      break;
    }

    case "error": {
      cls.push("bg-red-100 text-red-800 border-red-500");
      break;
    }

    default:
    case "info": {
      cls.push("bg-blue-100 text-blue-800 border-blue-500");
      break;
    }
  }

  return (
    <div
      role="alert"
      className={"p-4 mb-4 text-sm text-blue-800 rounded-lg" + cls.join(" ")}
    >
      {children}
    </div>
  );
}
```

We could (and will, soon) add more to the directory, like styles and tests. But
for now, just this file. And let’s export it.

```ts
// ./ui/index.tsx
export { default as Info } from "./Info/Info";
```

And let’s add the TypeScript paths.

```json
"compilerOptions": {
  "paths": {
    "@ui": ["./src/ui/index.tsx"],
  }
}
```

But, this won’t work just yet! We need to install `vite-tsconfig-paths` to allow
Vite to understand it.

```bash
~ npm i -D vite-tsconfig-paths
```

And add it in the config. I suggest putting it first just to be safe.

```ts
// ./vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
});
```

Great, so we have our component, but how to see how it looks? Well, you might
throw it in the main file, but there’s a better way.

## Writing stories

To create a story, first create its file: `Info.stories.tsx`. The process is
rather straightforward, and mostly consists of configuration.

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import Info from "./Info";

const meta: Meta<typeof Info> = {
  title: "UI/Info",
  component: Info,
};

export const Primary: StoryObj<typeof Info> = {
  args: {
    children: "Hello from Storybook",
  },
};

export default meta;
```

Let’s go through the file. First, we import types and the component in question.
Then we define the `meta` where all the info that Storybook digest resides. Note
the slash in the title – adding each creates a new “directory”, so right now we
have UI → Info, but soon we’ll expand this.

Last, but not least, is the definition of the story, named “Primary” as per
standard. But the naming is unimportant, it can be whatever, as long as it’s a
valid component (so, as long as it starts with a capital letter).

Okay, we got this, so let’s try if it works!

```bash
~ npm run storybook
```

If you see the Storybook page, and in the sidebar there’s an “UI” space, all
works great!

## Adding Plop to generate scaffolding

This is all fine and well, but creating such components and stories will surely
prove exhausting, right?

Yes. You can trust me here, it will get old very, very fast.

That’s why we can use a generator that will create empty components for us. Plop
can do this.

```bash
~ npm i -D plop
```

And create the config file in the root, named `plopfile.mjs`. In there, we can
define what we want to generate. Let’s start by defining a UI component:

```ts
// ./plopfile.mjs

function plop(/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator("ui", {
    description: "Create a new UI component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],
  });
}

export default plop;
```

Right now, it does nothing. Simply defines that such generator exists and asks
for the name, but to actually write files, it needs an “action”.

```ts
// ./plopfile.mjs

actions: [
  {
    type: "add",
    path: "./src/ui/{{pascalCase name}}/{{pascalCase name}}.tsx",
    templateFile: "./plop-templates/Component.tsx.hbs",
  },
  {
    type: "add",
    path: "./src/ui/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
    templateFile: "./plop-templates/Story.tsx.hbs",
  },
  {
    type: "append",
    path: "./src/ui/index.tsx",
    template: 'export { default as {{pascalCase name}} } from "./{{pascalCase name}}/{{pascalCase name}}";',
  },
],
```

Let’s go from the top. First, we _add_ a new file, with path being
`src/ui/Name/Name name.tsx`. If you look into the “prompts”, you’ll see that
there’s `name` property that is reflected in here. It also uses a template that
we are yet to write.

Second action is the same, it just has the story. And the third one is
_appending_ the export to the main `index.tsx` file.

Right, so let’s create the templates! It’s written in Handlebars and, frankly,
it’s quite straightforward.

```handlebars
// ./plop-templates/Component.tsx.hbs

import type { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function {{pascalCase name}}(props: Props) {
  return (
    <div {...props} />
  );
}
```

As you see, it’s very barebones. That’s by design, because eventually we will
expand component types and have different templates. For now, this will suffice.
Same with the story:

```handlebars
// ./plop-templates/Story.tsx.hbs

import type { Meta, StoryObj } from "@storybook/react";
import {{pascalCase name}} from "./{{pascalCase name}}";

const meta: Meta<typeof {{pascalCase name}}> = {
  title: "UI/{{pascalCase name}}",
  component: {{pascalCase name}},
};

export const Primary: StoryObj<typeof {{pascalCase name}}> = {
  args: {
    children: "Hello from Storybook",
  },
};

export default meta;
```

Lastly, let’s add the shortcut to npm scripts:

```json
"scripts": {
  ...

  "plop": "plop"
},
```

There’s one thing I like to do, and it’s to have Prettier run through the files
after we are done. It’s achievable with post-scripts:

```json
"scripts": {
  ...

  "plop": "plop",
  "postplop": "prettier --write 'src/**/*.{ts,tsx}'"
},
```

Right, so let’s test!

```bash
~ npm run plop
```

If everything worked, we should see a success report. All that’s left is to fire
up Storybook and see if all is fine!

—

UI libraries are complex, and the devil is always in the details. Today we’ve
managed to create a solid ground for development. Join me in the next videos
from the series, where we will dive into tests, visual regressions and atomic
design.
