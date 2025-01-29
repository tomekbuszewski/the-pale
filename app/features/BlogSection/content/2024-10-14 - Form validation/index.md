---
slug: 2024-10-14-form-validation-in-the-browser
title: Form validation in the browser
summary:
  With forms, we have a few ways of validation. Today I will tackle the default
  browser-based one.
pubdate: 2024-10-14
tags: react, validation, form, browser
youtube: https://youtu.be/n0Eu3BOIf2k
---

Forms are an integral part of almost all applications. It is the default way to
receive any input from the user. But they are as tricky, as they are popular.

Hi, my name is Tomasz and I am a former tech lead and manager. Today I will show
you, how to validate forms with React.

With forms, we have a few ways of validation. Today I will tackle the default
browser-based one.

## Preparation

I will, as almost always, use the default Vite project, so just run

```bash
npm create vite@latest -- --template react-ts
```

And you’re good.

I am also throwing in Tailwind, but this is just for the visual side, so you can
omit it if you want.

```bash
npm install -D tailwindcss postcss autoprefixer;
npx tailwindcss init -p;
```

For convenience, I will also create an `Input` component:

```tsx
// ./src/components/Input.tsx

import type { HTMLProps } from "react";

type Props = HTMLProps<HTMLInputElement>;

export default function Input({ className, ...props }: Props) {
  const classNames = [
    className,
    "p-2",
    "border",
    "border-1",
    "border-blue-200",
    "rounded",
    "lh-form-element",
    "h-form-element",
  ];

  return <input className={classNames.join(" ")} {...props} />;
}
```

It’s taken from
[React Design System](https://github.com/tomekbuszewski/react-design-system/blob/part-1-atomic-design/src/ui/atoms/Input/Input.tsxl)
piece, if you’re interested.

And the basic form, which we will use for the rest of this article:

```tsx
// ./src/App.tsx

import Input from "./components/Input.tsx";

function App() {
  return (
    <form action="" className="m-auto max-w-[400px] mt-[100px]">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <div className="mb-2 grid grid-cols-[1fr_2fr] items-center">
        <label htmlFor="name">Name:</label>
        <Input type="text" id="name" name="name" />
      </div>

      <div className="mb-2 grid grid-cols-[1fr_2fr] items-center">
        <label htmlFor="email">Email:</label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="mb-2 grid grid-cols-[1fr_2fr] items-center">
        <label htmlFor="password">Password:</label>
        <Input type="password" id="password" name="password" />
      </div>

      <div>
        <button type="submit" className="bg-blue-200 p-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
}

export default App;
```

## Basic validation in the browser

The most straightforward way to validate a form is to use HTML validation
built-in in every browser. It is done by adding attributes to the input fields.
For example, let’s say that we want to have the `name` field required, it needs
to be between 3 and 10 characters long. Honestly, nothing simpler:

```tsx
<Input
  type="text"
  id="name"
  name="name"
  required
  minLength={3}
  maxLength={10}
/>
```

Now if you run the app… nothing will change. Only if you submit, you’ll get the
information. But, we can do better!

The first thing is to add an `invalid` pseudo-selector to our Tailwind classes:

```tsx
// ./src/components/Input.tsx

export default function Input({ className, ...props }: Props) {
  const classNames = [
    className,
    "p-2",
    "border",
    "border-1",
    "border-blue-200",
    "rounded",
    "lh-form-element",
    "h-form-element",
    "invalid:border-red-500",
  ];

  return <input className={classNames.join(" ")} {...props} />;
}
```

Cool! But, now it is highlighted from the start! That’s a bit of a bummer, and
it certainly does not look good, nor it gives the right feedback to the user. So
let’s remove that line.

## Input-sensitive validation

Last year, browsers got another neat pseudo-class, called `user-invalid`.
Unfortunately, as far as I know, Tailwind in its current version does not
support it, but that’s not a problem. We can attach a CSS file to our input!

```css
// ./src/components/Input.module.css

.input:user-invalid {
  @apply border-red-500;
}
```

And let’s attach the class to the input itself:

```tsx
// ./src/components/Input.tsx

import type { HTMLProps } from "react";

import styles from "./Input.module.css";

type Props = HTMLProps<HTMLInputElement>;

export default function Input({ className, ...props }: Props) {
  const classNames = [
    className,
    "p-2",
    "border",
    "border-1",
    "border-blue-200",
    "rounded",
    "lh-form-element",
    "h-form-element",
    styles.input,
  ];

  return <input className={classNames.join(" ")} {...props} />;
}
```

(note the styles import.)

Alright, let’s see.

And we’re home! Well, almost. Let’s also add a message saying that this field
needs at least 3 characters and is required underneath:

```tsx

<Input
  type="text"
  id="name"
  name="name"
  required
  minLength={3}
  maxLength={10}
/>
<p className="hidden text-red-500 col-start-2">
  This field needs at least 3 characters and is required.
</p>
```

Right, so now the only thing to add is a sibling selector in CSS:

```css
.input:user-invalid ~ p {
  @apply block;
}
```

And we’re done!

## Email validation

Okay, but that’s not all we can do. Let’s say, we want email to be valid, so to
have `words@words.word` format. We can do this using regular expressions
(although it’s not the best solution and having a server-side validation for
this is recommended.)

Right, so let’s add the regex:

```tsx
<Input
  type="email"
  id="email"
  name="email"
  required
  pattern="[a-z0-9]{1,}@[a-z0-9]{1,}\.[a-z0-9]{2,}"
/>
<p className="hidden text-red-500 col-start-2">
  Format: email@address.com
</p>
```

It checks for a string of minimum of 1 character of length, then for a `@` and
for more characters and a dot between.

## Controlling the form using validation

You know what else can we do? I’ve always liked to display a message to the
customer, that they need to fix all the errors. I know it’s superfluous, but
hey.

To do this, first, let’s add the message itself:

```tsx
<form action="" className="m-auto max-w-[400px] mt-[100px]">
  <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
  <div className="error hidden rounded-md bg-red-100 text-red-500 mb-3 p-2">
    Please fix all errors before submission
  </div>
  ...
```

Quick and dirty way to solve this is to have another module:

```css
// ./src/form.module.css

.error {
  @apply hidden rounded-md bg-red-100 text-red-500 mb-3 p-2;
}

.form {
  @apply m-auto max-w-[400px] mt-[100px];
}

.form:has(:user-invalid) .error {
  @apply block;
}

.form:has(:user-invalid) button {
  @apply opacity-50 cursor-not-allowed;
}
```

…and to replace the inline styles with these:

```tsx
<form action="" className={styles.form}>
  <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
  <div className={styles.error}>
    Please fix all errors before submission
  </div>
  ...
```

And now, if we have an error in our form, we’ll get the error message, and the
button will be of lower opacity. The only thing we can’t do here is to disable
the button with pure CSS.

—

Form validation came a long way. From being completely non-existent in the
browser and only relying on the server, to JavaScript libraries, to whole form
managers, to, finally, built-in browser validation. Of course every solution has
its own pros and cons, and the larger the form, the more questions and problems
surface. But, for all the small ones, I believe the browser validation is the
way to go.

I hope you enjoyed this, thank you for watching and happy coding.
